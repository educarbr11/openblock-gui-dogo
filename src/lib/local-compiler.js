// Arduino compiler exposed by the DoGoBlock Agent Offline (openblock-link /openblock/compiler route).
const LOCAL_COMPILER_URL = 'ws://127.0.0.1:20111/openblock/compiler';
const CONNECT_TIMEOUT_MS = 5000;
// The first build of each board compiles the Arduino core, which is slow on Chromebooks.
const COMPILE_TIMEOUT_MS = 180000;
const POLICY_VIOLATION_CLOSE_CODE = 1008;

const AGENT_NOT_FOUND_MESSAGE = 'O DoGoBlock Link nao foi encontrado em 127.0.0.1:20111. ' +
    'Abra o DoGoBlock Agent Offline (ou o app DoGoBlock para computador) e tente novamente.';
const AGENT_WITHOUT_COMPILER_MESSAGE = 'O DoGoBlock Agent aberto nao compila programas offline. ' +
    'Instale a versao DoGoBlock Agent Offline.';
const ORIGIN_NOT_ALLOWED_MESSAGE = 'O DoGoBlock Agent recusou a compilacao pedida por este endereco do editor.';

/**
 * Compile an Arduino sketch with the local DoGoBlock Agent.
 * @param {string} board - board id, e.g. arduinoUno.
 * @param {string} code - Arduino sketch source.
 * @param {function} onStdout - receives compiler output while building.
 * @returns {Promise<string>} the Intel HEX artifact.
 */
const compileArduinoWithLocalAgent = (board, code, onStdout) => new Promise((resolve, reject) => {
    let socket;
    try {
        socket = new WebSocket(LOCAL_COMPILER_URL);
    } catch (error) {
        reject(new Error(AGENT_NOT_FOUND_MESSAGE));
        return;
    }

    let opened = false;
    let settled = false;
    let timeoutId = null;
    const finish = (error, hex) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        if (socket.readyState === WebSocket.OPEN) socket.close();
        if (error) reject(error);
        else resolve(hex);
    };

    timeoutId = window.setTimeout(() => finish(new Error(AGENT_NOT_FOUND_MESSAGE)), CONNECT_TIMEOUT_MS);

    socket.onopen = () => {
        opened = true;
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(
            () => finish(new Error('Tempo limite ao compilar no DoGoBlock Agent.')),
            COMPILE_TIMEOUT_MS
        );
        socket.send(JSON.stringify({jsonrpc: '2.0', id: 1, method: 'compile', params: {board, code}}));
    };
    socket.onmessage = event => {
        let message;
        try {
            message = JSON.parse(event.data);
        } catch (error) {
            return;
        }
        if (message.method === 'compileStdout') {
            if (onStdout && message.params) onStdout(message.params.message);
            return;
        }
        if (message.id !== 1) return;
        if (message.error) {
            finish(new Error(message.error.message || 'Falha ao compilar no DoGoBlock Agent.'));
        } else {
            finish(null, message.result.hex);
        }
    };
    socket.onclose = event => {
        if (!opened) {
            finish(new Error(AGENT_NOT_FOUND_MESSAGE));
        } else if (event.code === POLICY_VIOLATION_CLOSE_CODE) {
            finish(new Error(ORIGIN_NOT_ALLOWED_MESSAGE));
        } else {
            // Agents without the compiler route close the socket right after opening it.
            finish(new Error(AGENT_WITHOUT_COMPILER_MESSAGE));
        }
    };
});

export {
    compileArduinoWithLocalAgent
};
