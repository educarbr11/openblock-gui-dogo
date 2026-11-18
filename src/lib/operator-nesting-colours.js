const INSTALL_KEY = '__dogoblockOperatorNestingColoursInstalled';
const MAX_DEPTH = 5;
const LEVEL_BRIGHTNESS = 0.86;

const isOperator = block => block && typeof block.type === 'string' &&
    block.type.indexOf('operator_') === 0 && !block.isShadow() && !block.isInsertionMarker();

const getOperatorDepth = block => {
    let depth = 0;
    let parent = block.getParent();
    while (parent && parent.outputConnection) {
        if (isOperator(parent)) depth++;
        if (depth === MAX_DEPTH) break;
        parent = parent.getParent();
    }
    return depth;
};

const shadeColour = (colour, depth) => {
    if (!depth || typeof colour !== 'string' || !/^#[\da-f]{6}$/i.test(colour)) return colour;
    const brightness = Math.pow(LEVEL_BRIGHTNESS, depth);
    const channels = [1, 3, 5].map(offset => Math.round(parseInt(colour.slice(offset, offset + 2), 16) * brightness)
        .toString(16)
        .padStart(2, '0'));
    return `#${channels.join('').toUpperCase()}`;
};

/**
 * Derive nested operator colours only while the SVG renderer reads them.
 * Stored colours stay unchanged; native connection updates already repaint descendants.
 * @param {object} Blockly - The editor's Blockly instance.
 */
const installOperatorNestingColours = Blockly => {
    if (!Blockly.BlockSvg) return;
    const prototype = Blockly.BlockSvg.prototype;
    if (prototype[INSTALL_KEY]) return;

    ['getColour', 'getColourSecondary', 'getColourTertiary'].forEach(name => {
        const getOriginalColour = prototype[name];
        prototype[name] = function () {
            const colour = getOriginalColour.call(this);
            return isOperator(this) ? shadeColour(colour, getOperatorDepth(this)) : colour;
        };
    });
    prototype[INSTALL_KEY] = true;
};

export default installOperatorNestingColours;
