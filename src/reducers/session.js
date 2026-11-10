import {readAuthSession, clearAuthSession} from '../lib/auth-session';

const RESTORE_SESSION = 'scratch-gui/session/RESTORE_SESSION';
const LOGIN_SUCCESS = 'scratch-gui/session/LOGIN_SUCCESS';
const LOGOUT = 'scratch-gui/session/LOGOUT';

const makeState = storedSession => {
    if (!storedSession || !storedSession.user) {
        return {
            session: {}
        };
    }
    return {
        session: {
            user: Object.assign({}, storedSession.user, {
                token: storedSession.accessToken
            })
        },
        accessToken: storedSession.accessToken,
        permissions: {}
    };
};

const initialState = makeState(readAuthSession());

const reducer = (state, action) => {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case RESTORE_SESSION:
    case LOGIN_SUCCESS:
        return makeState(action.session);
    case LOGOUT:
        clearAuthSession();
        return makeState(null);
    default:
        return state;
    }
};

const restoreSession = session => ({
    type: RESTORE_SESSION,
    session
});

const loginSuccess = session => ({
    type: LOGIN_SUCCESS,
    session
});

const logout = () => ({
    type: LOGOUT
});

export {
    reducer as default,
    initialState as sessionInitialState,
    loginSuccess,
    logout,
    restoreSession
};
