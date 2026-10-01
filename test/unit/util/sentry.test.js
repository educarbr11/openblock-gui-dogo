/* eslint-env jest */
/* eslint-disable global-require */

const originalFetch = global.fetch;

const createSentryMock = () => {
    let trackedFetch = null;
    const scope = {
        setContext: jest.fn(),
        setTag: jest.fn()
    };
    const sdk = {
        captureException: jest.fn(() => 'exception-event-id'),
        feedbackIntegration: jest.fn(() => ({name: 'Feedback'})),
        flush: jest.fn(() => Promise.resolve(true)),
        makeFetchTransport: jest.fn((options, nativeFetch) => {
            trackedFetch = nativeFetch;
            return {flush: jest.fn(), send: jest.fn()};
        }),
        withScope: jest.fn(callback => callback(scope))
    };
    sdk.init = jest.fn(options => options.transport({url: options.tunnel}));
    sdk.captureFeedback = jest.fn(() => {
        trackedFetch('https://dogoblockapi.example/observability/envelope', {
            body: '{"dsn":"test"}\n{"type":"feedback"}\n{}',
            method: 'POST'
        }).catch(() => {});
        return 'feedback-event-id';
    });
    return {scope, sdk};
};

const loadSentryService = (dsn, fetchImplementation) => {
    jest.resetModules();
    process.env.SENTRY_DSN = dsn;
    process.env.SENTRY_ENVIRONMENT = 'test';
    process.env.SENTRY_RELEASE = 'dogoblock-test@1';
    process.env.SENTRY_TUNNEL_URL = 'https://dogoblockapi.example/observability/envelope';
    process.env.OPENBLOCK_TAURI_LIGHT = 'false';
    const fetchMock = jest.fn(fetchImplementation || (() => Promise.resolve({ok: true, status: 200})));
    global.fetch = fetchMock;

    const sentryMock = createSentryMock();
    jest.doMock('@sentry/react', () => sentryMock.sdk);
    return {
        fetchMock,
        sentryMock,
        service: require('../../../src/lib/sentry')
    };
};

afterEach(() => {
    delete process.env.SENTRY_DSN;
    delete process.env.SENTRY_ENVIRONMENT;
    delete process.env.SENTRY_RELEASE;
    delete process.env.SENTRY_TUNNEL_URL;
    delete process.env.OPENBLOCK_TAURI_LIGHT;
    global.fetch = originalFetch;
});

test('does not initialize or enable feedback without a DSN', () => {
    const {sentryMock, service} = loadSentryService('');

    expect(service.initializeSentry()).toBe(false);
    expect(service.isFeedbackEnabled()).toBe(false);
    expect(sentryMock.sdk.init).not.toHaveBeenCalled();
});

test('registers the official feedback integration without injecting a duplicate widget', () => {
    const {sentryMock, service} = loadSentryService('https://public@example.invalid/1');
    service.initializeSentry();

    const options = sentryMock.sdk.init.mock.calls[0][0];
    expect(options.integrations([{name: 'Breadcrumbs'}, {name: 'GlobalHandlers'}])).toEqual([
        {name: 'GlobalHandlers'},
        {name: 'Feedback'}
    ]);
    expect(sentryMock.sdk.feedbackIntegration).toHaveBeenCalledWith({
        autoInject: false,
        colorScheme: 'system',
        enableScreenshot: true
    });
    expect(options.tunnel).toBe('https://dogoblockapi.example/observability/envelope');
    expect(sentryMock.sdk.makeFetchTransport).toHaveBeenCalled();
});

test('sanitizes sensitive event metadata before sending it', () => {
    const {sentryMock, service} = loadSentryService('https://public@example.invalid/1');
    service.initializeSentry();

    const options = sentryMock.sdk.init.mock.calls[0][0];
    const sanitized = options.beforeSend({
        breadcrumbs: [{message: 'private navigation details'}],
        request: {
            cookies: {session: 'secret'},
            data: {project: 'private'},
            headers: {authorization: 'Bearer secret'},
            url: 'https://dogoblock.example/editor?token=secret#private'
        },
        extra: {
            accessToken: 'secret',
            pageUrl: 'https://dogoblock.example/project?id=123',
            nested: {a: {b: {c: {d: {e: {password: 'secret'}}}}}}
        },
        user: {id: 'private-user-id'}
    });

    expect(sanitized.request.url).toBe('https://dogoblock.example/editor');
    expect(sanitized.request.cookies).toBeUndefined();
    expect(sanitized.request.data).toBeUndefined();
    expect(sanitized.request.headers.authorization).toBe('[Filtered]');
    expect(sanitized.extra.accessToken).toBe('[Filtered]');
    expect(sanitized.extra.pageUrl).toBe('https://dogoblock.example/project');
    expect(sanitized.extra.nested.a.b.c.d.e).toBe('[Truncated]');
    expect(sanitized.breadcrumbs).toBeUndefined();
    expect(sanitized.user).toBeUndefined();
});

test('submits categorized feedback associated with a captured error', async () => {
    const {sentryMock, service} = loadSentryService('https://public@example.invalid/1');
    service.initializeSentry();

    const exceptionId = service.captureAppException(new Error('failure'), {
        deviceId: 'arduinoUno',
        locale: 'pt-br',
        programMode: 'upload',
        routeUrl: 'https://dogoblock.example/editor?token=secret'
    });
    const feedbackId = await service.submitFeedback({
        associatedEventId: exceptionId,
        category: 'error',
        context: {
            deviceId: 'arduinoUno',
            locale: 'pt-br',
            programMode: 'upload'
        },
        description: 'O editor parou durante uma ação.',
        email: '',
        name: '',
        title: 'Falha no editor'
    });

    expect(exceptionId).toBe('exception-event-id');
    expect(feedbackId).toBe('feedback-event-id');
    expect(sentryMock.scope.setTag).toHaveBeenCalledWith('device', 'arduinoUno');
    expect(sentryMock.sdk.captureFeedback).toHaveBeenCalledWith(expect.objectContaining({
        associatedEventId: 'exception-event-id',
        message: '[error] Falha no editor\n\nO editor parou durante uma ação.',
        source: 'dogoblock-crash-screen',
        tags: expect.objectContaining({
            'device': 'arduinoUno',
            'feedback.kind': 'error',
            'programMode': 'upload'
        })
    }));
    expect(sentryMock.sdk.flush).toHaveBeenCalledWith(5000);
});

test('rejects feedback while offline without dropping it into the SDK queue', async () => {
    const {sentryMock, service} = loadSentryService('https://public@example.invalid/1');
    service.initializeSentry();
    const previousOnline = navigator.onLine;
    Object.defineProperty(navigator, 'onLine', {configurable: true, value: false});

    let deliveryError = null;
    try {
        await service.submitFeedback({
            category: 'bug',
            context: {},
            description: 'Descrição do problema',
            title: 'Falha offline'
        });
    } catch (error) {
        deliveryError = error;
    }
    expect(deliveryError.message).toBe('Network is offline');
    expect(sentryMock.sdk.captureFeedback).not.toHaveBeenCalled();

    Object.defineProperty(navigator, 'onLine', {configurable: true, value: previousOnline});
});

test('sends an explicitly selected screenshot as a feedback attachment', async () => {
    const {sentryMock, service} = loadSentryService('https://public@example.invalid/1');
    service.initializeSentry();
    const screenshotData = new Uint8Array([1, 2, 3]);

    await service.submitFeedback({
        category: 'bug',
        context: {},
        description: 'A interface ficou cortada.',
        screenshot: {
            contentType: 'image/png',
            data: screenshotData,
            filename: '../captura da tela.png'
        },
        title: 'Modal cortado'
    });

    expect(sentryMock.sdk.captureFeedback).toHaveBeenCalledWith(
        expect.objectContaining({message: '[bug] Modal cortado\n\nA interface ficou cortada.'}),
        {attachments: [{
            contentType: 'image/png',
            data: screenshotData,
            filename: '.._captura_da_tela.png'
        }]}
    );
});

test('rejects feedback when the tunnel request is blocked by the client', async () => {
    const {service} = loadSentryService(
        'https://public@example.invalid/1',
        () => Promise.reject(new TypeError('Failed to fetch'))
    );
    service.initializeSentry();

    let deliveryError = null;
    try {
        await service.submitFeedback({
            category: 'bug',
            context: {},
            description: 'O navegador bloqueou o envio.',
            title: 'Falha no transporte'
        });
    } catch (error) {
        deliveryError = error;
    }
    expect(deliveryError.message).toBe('Failed to fetch');
});
