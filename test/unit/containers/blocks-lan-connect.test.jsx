/* eslint-env jest */
import VM from 'openblock-vm';
import {Blocks} from '../../../src/containers/blocks.jsx';
import VMScratchBlocks from '../../../src/lib/blocks';

const {createBlocklySvg} = require('../../helpers/blockly-svg');

jest.mock('../../../src/lib/blocks', () => jest.fn());
jest.mock('openblock-blocks', () => ({}));
jest.mock('../../../src/lib/code-generator', () => ({}));
jest.mock('../../../src/lib/make-toolbox-xml', () => () => '<xml/>');
jest.mock('../../../src/components/blocks/blocks.jsx', () => () => null);
jest.mock('../../../src/containers/extension-library.jsx', () => () => null);
jest.mock('../../../src/containers/device-library.jsx', () => () => null);
jest.mock('../../../src/containers/custom-procedures.jsx', () => () => null);
jest.mock('../../../src/containers/prompt.jsx', () => () => null);

const lanToolbox = '<xml><category name="LAN" id="lan">' +
    '<button text="Connect to LAN" callbackKey="LAN_CONNECT"/></category></xml>';

describe('LAN toolbox button', () => {
    let fixture;
    let vm;
    let controller;
    let button;
    let warning;

    beforeEach(() => {
        fixture = createBlocklySvg();
        vm = new VM();
        const {Blockly, workspace, document} = fixture;
        VMScratchBlocks.mockReturnValue(Blockly);
        // Keep Blockly's actual button and callback lookup. Only replace the
        // browser-only toolbox layout performed during workspace injection.
        workspace.flyoutButtonCallbacks_ = {};
        workspace.getGesture = () => null;
        workspace.getFlyout = () => ({getWorkspace: () => ({registerButtonCallback: jest.fn()})});
        workspace.updateToolbox = jest.fn(xml => {
            const node = Blockly.Xml.textToDom(xml).querySelector('button[callbackKey="LAN_CONNECT"]');
            button = node ? new Blockly.FlyoutButton(workspace, workspace, node, false) : null;
        });
        Blockly.inject = jest.fn((element, options) => {
            workspace.updateToolbox(options.toolbox);
            return workspace;
        });
        warning = jest.spyOn(console, 'warn').mockImplementation(() => {});
        controller = new Blocks({
            ...Blocks.defaultProps,
            isRealtimeMode: true,
            locale: 'en',
            toolboxXML: lanToolbox,
            vm
        });
        controller.blocks = document.createElement('div');
        controller.attachVM = jest.fn();
        controller.setLocale = jest.fn();
        controller.loadDefaultScratchExtensions = jest.fn();
    });

    afterEach(() => {
        warning.mockRestore();
        fixture.dispose();
    });

    test('a restored LAN button invokes the current VM on every real Blockly click', () => {
        const request = jest.fn();
        vm.runtime.on('LAN_CONNECT_REQUEST', request);
        controller.componentDidMount();
        button.onMouseUp_({});
        button.onMouseUp_({});
        expect(request.mock.calls).toEqual([[{manual: true}], [{manual: true}]]);
    });

    test('an extension added after mounting gets the same working button callback', () => {
        controller.props = {...controller.props, toolboxXML: '<xml><category name="Motion"/></xml>'};
        const request = jest.fn();
        vm.runtime.on('LAN_CONNECT_REQUEST', request);
        controller.componentDidMount();
        expect(fixture.workspace.updateToolbox).toHaveBeenCalledTimes(1);
        fixture.workspace.updateToolbox(lanToolbox);
        button.onMouseUp_({});
        expect(request).toHaveBeenCalledWith({manual: true});
    });
});
