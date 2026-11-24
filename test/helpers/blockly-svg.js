const fs = require('fs');
const path = require('path');
const vm = require('vm');
const {jsdom} = require('jsdom');

const SVG_NS = 'http://www.w3.org/2000/svg';

// jsdom has SVG nodes but no text/layout engine. Only provide metrics here;
// Blockly's block classes, connections, rendering and colour methods stay real.
const installSvgMetrics = windowRef => {
    const prototype = (windowRef.SVGElement || windowRef.Element).prototype;
    if (!prototype.getBBox) {
        prototype.getBBox = function () {
            return {x: 0, y: 0, width: (this.textContent || '').length * 8, height: 16};
        };
    }
    if (!prototype.getComputedTextLength) {
        prototype.getComputedTextLength = function () {
            return (this.textContent || '').length * 8;
        };
    }
};

const createBlocklySvg = () => {
    const documentRef = typeof document === 'undefined' ?
        jsdom('<!doctype html><html><body></body></html>') : document;
    const windowRef = documentRef.defaultView;
    const existingNodes = Array.from(documentRef.body.children);
    installSvgMetrics(windowRef);
    const sandbox = vm.createContext({
        window: windowRef,
        document: documentRef,
        navigator: windowRef.navigator,
        // Older jsdom exposes native DOM serialization via outerHTML, but no constructor.
        XMLSerializer: windowRef.XMLSerializer || class {
            serializeToString (node) {
                return node.outerHTML;
            }
        },
        DOMParser: windowRef.DOMParser,
        console,
        setTimeout,
        clearTimeout
    });
    const root = path.dirname(require.resolve('openblock-blocks/package.json'));
    ['blockly_compressed_vertical.js', 'msg/messages.js', 'blocks_compressed.js',
        'blocks_compressed_vertical.js', 'msg/scratch_msgs.js'].forEach(filename => {
        vm.runInContext(fs.readFileSync(path.join(root, filename), 'utf8'), sandbox, {filename});
    });
    const Blockly = sandbox.Blockly;
    Blockly.ScratchMsgs.setLocale('en');

    const host = documentRef.createElement('div');
    host.setAttribute('class', 'injectionDiv');
    const svg = documentRef.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', '1000');
    svg.setAttribute('height', '700');
    host.appendChild(svg);
    documentRef.body.appendChild(host);
    const options = new Blockly.Options({
        toolbox: '<xml></xml>',
        readOnly: false,
        comments: false,
        collapse: false,
        disable: true,
        sounds: false,
        scrollbars: false,
        getMetrics: () => ({
            viewWidth: 1000,
            viewHeight: 700,
            contentWidth: 1000,
            contentHeight: 700,
            viewTop: 0,
            viewLeft: 0,
            contentTop: 0,
            contentLeft: 0,
            absoluteTop: 0,
            absoluteLeft: 0
        })
    });
    const workspace = new Blockly.WorkspaceSvg(options);
    svg.appendChild(workspace.createDom());
    workspace.getParentSvg();
    Blockly.mainWorkspace = workspace;
    Blockly.WidgetDiv.createDom();
    Blockly.DropDownDiv.createDom();

    const newBlock = type => {
        const block = workspace.newBlock(type);
        block.initSvg();
        block.render(false);
        return block;
    };
    const dispose = () => {
        workspace.dispose();
        Blockly.mainWorkspace = null;
        Array.from(documentRef.body.children).forEach(node => {
            if (existingNodes.indexOf(node) === -1) node.parentNode.removeChild(node);
        });
    };
    return {Blockly, workspace, newBlock, svg, document: documentRef, window: windowRef, dispose};
};

module.exports = {createBlocklySvg};
