const getArguments = json => Object.keys(json || {})
    .filter(key => /^args\d+$/.test(key))
    .reduce((args, key) => args.concat(json[key]), []);

/**
 * Resolve pin menus from the selected device, independently of the visible toolbox category.
 * CommonJS keeps this implementation shared with the Node-based block/Arduino compilation checks.
 * @param {object} Blockly - The editor's Blockly instance.
 * @param {object} vm - The VM whose device metadata supplies the pin menus.
 */
const installDevicePinOptions = (Blockly, vm) => {
    Blockly.Device.getPinOptions = type => {
        const categories = vm.runtime._deviceBlockInfo || [];
        const category = categories.find(item => (item.blocks || []).some(block =>
            block.json && block.json.type === type));
        const block = category && category.blocks.find(item => item.json && item.json.type === type);
        const pin = block && getArguments(block.json).find(arg => arg.name === 'PIN');
        let options = pin && pin.type === 'field_dropdown' ? pin.options : null;

        if (!options && block && block.info && block.info.arguments && block.info.arguments.PIN) {
            const menuName = block.info.arguments.PIN.menu;
            const menu = (category.menus || []).find(item => item.json &&
                item.json.type === `${category.id}_menu_${menuName}`);
            const field = menu && getArguments(menu.json).find(arg =>
                arg.type === 'field_dropdown' && arg.name === menuName);
            options = field && field.options;
        }

        if (typeof options === 'function') options = options();
        if (!Array.isArray(options) || options.length === 0) {
            throw new Error(`Pin options unavailable for device block: ${type}`);
        }

        // FieldDropdown may normalize options; never mutate the VM's source metadata.
        return options.map(option => option.slice());
    };
};

module.exports = installDevicePinOptions; // eslint-disable-line import/no-commonjs
