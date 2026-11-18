/* eslint-disable no-console */
/* eslint-env es6 */
const assert = require('assert');
const dgram = require('dgram');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');

const VirtualMachine = require('../../openblock-vm/src/virtual-machine');
const Sprite = require('../../openblock-vm/src/sprites/sprite');
const OpenBlockLink = require('../../openblock-link/src');
const WebSocket = require('../../openblock-link/node_modules/ws');
const formatMessage = require('../../openblock-vm/node_modules/format-message');

formatMessage.setup({locale: 'en', missingTranslation: 'ignore'});

const MESSAGE = 'ação-🎮';
const DEADLINE_MS = 5000;
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

const bounded = (promise, label, timeout = DEADLINE_MS) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`LAN E2E timed out: ${label}`)), timeout);
    promise.then(value => {
        clearTimeout(timer);
        resolve(value);
    }, error => {
        clearTimeout(timer);
        reject(error);
    });
});

const availablePort = async protocol => {
    const server = protocol === 'udp' ? dgram.createSocket('udp4') : http.createServer();
    try {
        await bounded(new Promise((resolve, reject) => {
            server.once('error', reject);
            if (protocol === 'udp') server.bind(0, '127.0.0.1', resolve);
            else server.listen(0, '127.0.0.1', resolve);
        }), `reserve ${protocol} port`);
        return server.address().port;
    } finally {
        await new Promise(resolve => {
            try {
                server.close(resolve);
            } catch (error) {
                // An unsuccessful UDP bind has no open handle to close.
                resolve();
            }
        });
    }
};

const startLink = async (udpPort, servers) => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'dogoblock-lan-e2e-'));
    const server = {directory, link: null, port: null};
    servers.push(server);
    server.port = await availablePort('tcp');
    server.link = new OpenBlockLink(directory, null, {lan: {
        port: udpPort,
        multicastInterface: '127.0.0.1'
    }});
    await bounded(new Promise((resolve, reject) => {
        server.link.once('ready', resolve);
        server.link._httpServer.once('error', reject);
        server.link.listen(server.port, '127.0.0.1');
    }), 'start Link');
    return server;
};

/** Real WebSocket adapter implementing the runtime's ScratchLinkSocket interface. */
class LocalLanSocket {
    constructor (port, sockets) {
        this.port = port;
        this.sockets = sockets;
    }
    setOnOpen (callback) {
        this.onOpen = callback;
    }
    setOnClose (callback) {
        this.onClose = callback;
    }
    setOnError (callback) {
        this.onError = callback;
    }
    setHandleMessage (callback) {
        this.onMessage = callback;
    }
    open () {
        this.socket = new WebSocket(`ws://127.0.0.1:${this.port}/openblock/lan`, {
            origin: 'http://localhost:8601'
        });
        this.sockets.push(this.socket);
        this.socket.on('open', this.onOpen);
        this.socket.on('close', this.onClose);
        this.socket.on('error', this.onError);
        this.socket.on('message', bytes => this.onMessage(JSON.parse(bytes.toString())));
    }
    sendMessage (message) {
        this.socket.send(JSON.stringify(message));
    }
    close () {
        if (this.socket) this.socket.close();
    }
    isOpen () {
        return Boolean(this.socket && this.socket.readyState === WebSocket.OPEN);
    }
}

const block = (target, id, opcode, options = {}) => target.blocks.createBlock(Object.assign({
    id, opcode, next: null, parent: null, fields: {}, inputs: {}, shadow: false, topLevel: false
}, options));
const input = id => ({name: 'MESSAGE', block: id, shadow: id});
const text = (target, id, parent, value) => block(target, id, 'text', {
    parent, shadow: true, fields: {TEXT: {name: 'TEXT', value}}
});

const addReceiver = entry => {
    const target = entry.target;
    block(target, 'receive', 'lan_whenReceived', {
        topLevel: true, next: 'capture', inputs: {MESSAGE: input('receive-name')}
    });
    text(target, 'receive-name', 'receive', MESSAGE);
    block(target, 'capture', 'test_capture', {
        parent: 'receive', inputs: {VALUE: {name: 'VALUE', block: 'received-value', shadow: null}}
    });
    block(target, 'received-value', 'lan_valueReceived', {
        parent: 'capture', inputs: {MESSAGE: input('reporter-name')}
    });
    text(target, 'reporter-name', 'received-value', MESSAGE);
    entry.vm.runtime._primitives.test_capture = args => entry.received.push(args.VALUE);
};

const addSender = entry => {
    block(entry.target, 'flag', 'event_whenflagclicked', {topLevel: true, next: 'broadcast'});
    block(entry.target, 'broadcast', 'lan_broadcastWithValue', {
        parent: 'flag',
        inputs: {
            MESSAGE: input('send-name'), VALUE: {name: 'VALUE', block: 'send-value', shadow: 'send-value'}
        }
    });
    text(entry.target, 'send-name', 'broadcast', MESSAGE);
    text(entry.target, 'send-value', 'broadcast', '23.5');
};

const makeVm = async (server, entries, sockets) => {
    const vm = new VirtualMachine();
    const entry = {vm, received: [], statuses: []};
    entries.push(entry);
    vm.runtime.currentStepTime = 30;
    vm.runtime.on('LAN_STATUS', state => entry.statuses.push(state));
    vm.configureScratchLinkSocketFactory(type => {
        assert.strictEqual(type, 'LAN');
        return new LocalLanSocket(server.port, sockets);
    });
    vm.extensionManager.loadExtensionIdSync('lan');
    entry.extension = vm.extensionManager._loadedExtensionInstances.get('lan');
    assert.ok(entry.extension, 'LAN is registered through the real extension manager');
    await bounded(entry.extension._client.connect(), 'connect VM to Link');
    entry.target = new Sprite(null, vm.runtime).createClone();
    entry.target.isStage = true;
    vm.runtime.addTarget(entry.target);
    addReceiver(entry);
    return entry;
};

const step = entries => entries.forEach(entry => entry.vm.runtime._step());
const pumpUntil = async (entries, condition, label) => {
    const deadline = Date.now() + DEADLINE_MS;
    while (!condition()) {
        assert.ok(Date.now() < deadline, `LAN E2E timed out: ${label}`);
        step(entries);
        await pause(5);
    }
};
const pumpQuietly = async entries => {
    const deadline = Date.now() + 150;
    while (Date.now() < deadline) {
        step(entries);
        await pause(5);
    }
};
const sendFromGreenFlag = async (sender, entries, value) => {
    sender.target.blocks.changeBlock({id: 'send-value', element: 'field', name: 'TEXT', value});
    sender.vm.greenFlag();
    await pumpUntil(entries, () => !sender.vm.runtime.threads.some(thread => thread.topBlock === 'flag'),
        'execute green flag → broadcast');
};

const closeSocket = socket => bounded(new Promise(resolve => {
    if (socket.readyState === WebSocket.CLOSED) return resolve();
    socket.once('close', resolve);
    socket.close();
}), 'close WebSocket', 500).catch(error => {
    socket.terminate();
    throw error;
});

const cleanup = async (entries, servers, sockets) => {
    const errors = [];
    entries.forEach(entry => {
        [() => entry.vm.extensionManager.clearExtensions(), () => entry.vm.runtime.dispose()].forEach(dispose => {
            try {
                dispose();
            } catch (error) {
                errors.push(error);
            }
        });
    });
    const closed = await Promise.allSettled(sockets.map(closeSocket));
    closed.forEach(result => {
        if (result.status === 'rejected') errors.push(result.reason);
    });
    for (const server of servers) {
        try {
            if (server.link) {
                await bounded(new Promise(resolve => server.link._socketServer.close(resolve)), 'close WS server', 500);
                assert.strictEqual(server.link._lanHub._clients.size, 0, 'LAN sessions were disposed');
                assert.strictEqual(server.link._lanHub._socket, null, 'last VM released multicast');
                await bounded(new Promise(resolve => server.link._httpServer.close(resolve)), 'close HTTP server', 500);
            }
        } catch (error) {
            errors.push(error);
            if (server.link) {
                server.link._lanHub._close();
                server.link._httpServer.close(() => {});
            }
        } finally {
            try {
                fs.rmSync(server.directory, {recursive: true, force: true});
            } catch (error) {
                errors.push(error);
            }
        }
    }
    if (errors.length) throw errors[0];
};

const main = async () => {
    const servers = [];
    const entries = [];
    const sockets = [];
    let failure = null;
    try {
        const udpPort = await availablePort('udp');
        const firstLink = await startLink(udpPort, servers);
        const secondLink = await startLink(udpPort, servers);
        const sender = await makeVm(firstLink, entries, sockets);
        const receiver = await makeVm(secondLink, entries, sockets);
        addSender(sender);
        assert.notStrictEqual(firstLink.link._lanHub, secondLink.link._lanHub);
        assert.notStrictEqual(firstLink.link._lanHub._socket, secondLink.link._lanHub._socket);
        assert.strictEqual(firstLink.link._lanHub._socket.address().port, udpPort);
        assert.strictEqual(secondLink.link._lanHub._socket.address().port, udpPort);

        await sendFromGreenFlag(sender, entries, '23.5');
        await pumpUntil(entries, () => receiver.received.length === 1, 'receive LAN hat and nested reporter');
        await pumpQuietly(entries);
        assert.deepStrictEqual(receiver.received, ['23.5']);
        assert.deepStrictEqual(sender.received, [], 'sender does not trigger its own LAN hat');

        await bounded(receiver.extension.setChannel({CHANNEL: 7}), 'select receiver channel 7');
        await sendFromGreenFlag(sender, entries, 'isolated');
        await pumpQuietly(entries);
        assert.deepStrictEqual(receiver.received, ['23.5'], 'different channels do not trigger the hat');
        assert.strictEqual(receiver.extension.valueReceived({MESSAGE}), '', 'channel 7 has no value from channel 6');

        await bounded(sender.extension.setChannel({CHANNEL: 7}), 'select sender channel 7');
        await sendFromGreenFlag(sender, entries, 'same-channel');
        await pumpUntil(entries, () => receiver.received.length === 2, 'receive after channel alignment');
        await pumpQuietly(entries);
        assert.deepStrictEqual(receiver.received, ['23.5', 'same-channel']);
        assert.deepStrictEqual(sender.received, []);
        entries.forEach(entry => assert.strictEqual(entry.extension._client.status, 'connected',
            JSON.stringify(entry.statuses)));
    } catch (error) {
        failure = error;
    } finally {
        try {
            await cleanup(entries, servers, sockets);
        } catch (error) {
            if (!failure) failure = error;
        }
    }
    if (failure) throw failure;
    console.log('LAN E2E passed: two real VMs, two Link servers, UDP multicast loopback, hats, values and channels.');
};

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
