import {
    getProjectDetails,
    getMyProfile,
    listProjects,
    listPublicProjects,
    logout,
    setAuthSessionChangeHandler,
    uploadProjectCover
} from '../../../src/lib/dogoblock-api';
import {getApiHost} from '../../../src/lib/dogoblock-api-config';
import {readAuthSession, writeAuthSession} from '../../../src/lib/auth-session';

const response = (status, body) => ({
    ok: status >= 200 && status < 300,
    status,
    text: () => Promise.resolve(body === null ? '' : JSON.stringify(body))
});

describe('Dogoblock API authentication', () => {
    beforeEach(() => {
        const values = {};
        Object.defineProperty(window, 'localStorage', {
            configurable: true,
            value: {
                clear: () => Object.keys(values).forEach(key => delete values[key]),
                getItem: key => {
                    if (Object.prototype.hasOwnProperty.call(values, key)) return values[key];
                    return null;
                },
                removeItem: key => delete values[key],
                setItem: (key, value) => {
                    values[key] = String(value);
                }
            }
        });
        window.localStorage.clear();
        setAuthSessionChangeHandler(null);
        global.fetch = jest.fn();
    });

    afterEach(() => {
        delete global.fetch;
    });

    test('renews an expired session and retries the original request', () => {
        const user = {id: 'user-1', name: 'Dogo'};
        writeAuthSession({accessToken: 'expired', refreshToken: 'r'.repeat(96), user});
        const onSessionChange = jest.fn();
        setAuthSessionChangeHandler(onSessionChange);

        global.fetch.mockImplementation((url, options) => {
            if (url.endsWith('/auth/refresh')) {
                return Promise.resolve(response(200, {
                    accessToken: 'renewed',
                    refreshToken: 'n'.repeat(96),
                    user
                }));
            }
            if (options.headers.Authorization === 'Bearer expired') {
                return Promise.resolve(response(401, {message: 'Unauthorized'}));
            }
            return Promise.resolve(response(200, {id: 'profile-1'}));
        });

        return getMyProfile().then(profile => {
            expect(profile).toEqual({id: 'profile-1'});
            expect(readAuthSession().accessToken).toBe('renewed');
            expect(onSessionChange).toHaveBeenCalledWith(expect.objectContaining({accessToken: 'renewed'}));
            expect(global.fetch).toHaveBeenCalledTimes(3);
        });
    });

    test('shares one refresh request between concurrent protected requests', () => {
        const user = {id: 'user-1', name: 'Dogo'};
        writeAuthSession({accessToken: 'expired', refreshToken: 'r'.repeat(96), user});
        let refreshCalls = 0;

        global.fetch.mockImplementation((url, options) => {
            if (url.endsWith('/auth/refresh')) {
                refreshCalls += 1;
                return Promise.resolve(response(200, {
                    accessToken: 'renewed',
                    refreshToken: 'n'.repeat(96),
                    user
                }));
            }
            if (options.headers.Authorization === 'Bearer expired') {
                return Promise.resolve(response(401, {message: 'Unauthorized'}));
            }
            return Promise.resolve(response(200, []));
        });

        return Promise.all([getMyProfile(), listProjects()]).then(() => {
            expect(refreshCalls).toBe(1);
        });
    });

    test('clears a legacy session when it cannot be renewed', () => {
        writeAuthSession({accessToken: 'expired', user: {id: 'user-1'}});
        const onSessionChange = jest.fn();
        setAuthSessionChangeHandler(onSessionChange);
        global.fetch.mockImplementation(() => Promise.resolve(response(401, {message: 'Unauthorized'})));

        return getMyProfile()
            .then(() => Promise.reject(new Error('Expected request to fail')))
            .catch(error => {
                expect(error.status).toBe(401);
                expect(readAuthSession()).toBe(null);
                expect(onSessionChange).toHaveBeenCalledWith(null);
            });
    });

    test('clears local state before the logout request finishes', () => {
        writeAuthSession({
            accessToken: 'access',
            refreshToken: 'r'.repeat(96),
            user: {id: 'user-1'}
        });
        global.fetch.mockImplementation(() => Promise.resolve(response(200, {message: 'Sessao encerrada'})));

        const request = logout();
        expect(readAuthSession()).toBe(null);

        return request.then(() => {
            expect(global.fetch.mock.calls[0][0]).toMatch(/\/auth\/logout$/);
        });
    });

    test('uses the API host for legacy cover URLs in project details', () => {
        global.fetch.mockImplementation(() => Promise.resolve(response(200, {
            id: 'project-1',
            thumbnailUrl: 'http://localhost:3000/project-covers/project-1.png?v=123'
        })));

        return getProjectDetails('project-1').then(project => {
            expect(project.thumbnailUrl).toBe(`${getApiHost()}/project-covers/project-1.png?v=123`);
        });
    });

    test('normalizes cover URLs returned after upload and in project lists', () => {
        global.fetch.mockImplementation(() => Promise.resolve(response(200, [{
            id: 'project-1',
            thumbnailUrl: '/project-covers/project-1.png?v=123'
        }, {
            id: 'project-2',
            thumbnailUrl: 'https://images.example.com/cover.png'
        }])));

        return listPublicProjects().then(projects => {
            expect(projects[0].thumbnailUrl).toBe(`${getApiHost()}/project-covers/project-1.png?v=123`);
            expect(projects[1].thumbnailUrl).toBe('https://images.example.com/cover.png');
            global.fetch.mockImplementation(() => Promise.resolve(response(200, {
                id: 'project-1',
                thumbnailUrl: 'http://localhost:3000/project-covers/project-1.png?v=124'
            })));
            return uploadProjectCover('project-1', new File(['image'], 'cover.png', {type: 'image/png'}));
        })
            .then(project => {
                expect(project.thumbnailUrl).toBe(`${getApiHost()}/project-covers/project-1.png?v=124`);
            });
    });
});
