import installOperatorNestingColours from '../../../src/lib/operator-nesting-colours';
import {createBlocklySvg} from '../../helpers/blockly-svg';

const fill = block => block.svgPath_.getAttribute('fill');
const stroke = block => block.svgPath_.getAttribute('stroke');
const connect = (parent, input, child) => parent.getInput(input).connection.connect(child.outputConnection);

describe('nested operator colours rendered into real Blockly SVG', () => {
    let context;
    let Blockly;
    let workspace;
    let newBlock;
    beforeEach(() => {
        context = createBlocklySvg();
        ({Blockly, workspace, newBlock} = context);
        installOperatorNestingColours(Blockly);
    });
    afterEach(() => context.dispose());

    test('keeps the outer operator palette inside a Motion statement and darkens its nested expression', () => {
        const motion = newBlock('motion_movesteps');
        const random = newBlock('operator_random');
        const product = newBlock('operator_multiply');
        connect(motion, 'STEPS', random);
        connect(random, 'FROM', product);

        expect(workspace instanceof Blockly.WorkspaceSvg).toBe(true);
        expect(product instanceof Blockly.BlockSvg).toBe(true);
        expect(product.svgPath_.namespaceURI).toBe('http://www.w3.org/2000/svg');
        expect(fill(motion)).toBe('#4C97FF');
        expect(fill(random)).toBe('#59C059');
        expect(stroke(random)).toBe('#389438');
        expect(fill(product)).toBe('#4DA54D');
        expect(product.getColourSecondary()).toBe('#3C9F3C');
        expect(stroke(product)).toBe('#307F30');
    });

    test('uses equal colours for siblings and progressively darker SVG fills and strokes below them', () => {
        const root = newBlock('operator_add');
        const left = newBlock('operator_multiply');
        const right = newBlock('operator_subtract');
        const deepest = newBlock('operator_multiply');
        connect(root, 'NUM1', left);
        connect(root, 'NUM2', right);
        connect(right, 'NUM2', deepest);

        expect(fill(root)).toBe('#59C059');
        expect(fill(left)).toBe('#4DA54D');
        expect(fill(right)).toBe(fill(left));
        expect(fill(deepest)).toBe('#428E42');
        expect(deepest.getColourSecondary()).toBe('#348934');
        expect(stroke(deepest)).toBe('#296D29');
    });

    test('repaints a complete subtree on detach and reparent through native connections', () => {
        const root = newBlock('operator_add');
        const branch = newBlock('operator_multiply');
        const leaf = newBlock('operator_subtract');
        const newRoot = newBlock('operator_random');
        connect(branch, 'NUM1', leaf);
        connect(root, 'NUM1', branch);
        expect(fill(branch)).toBe('#4DA54D');
        expect(fill(leaf)).toBe('#428E42');

        branch.outputConnection.disconnect();
        expect(fill(branch)).toBe('#59C059');
        expect(fill(leaf)).toBe('#4DA54D');
        connect(newRoot, 'FROM', root);
        connect(root, 'NUM2', branch);
        expect(fill(branch)).toBe('#428E42');
        expect(fill(leaf)).toBe('#397A39');
    });

    test('undo and redo update SVG colours without adding colour changes to the undo stack', () => {
        const root = newBlock('operator_add');
        const nested = newBlock('operator_multiply');
        Blockly.Events.fireNow_();
        workspace.clearUndo();
        connect(root, 'NUM1', nested);
        Blockly.Events.fireNow_();
        expect(fill(nested)).toBe('#4DA54D');

        workspace.undo(false);
        Blockly.Events.fireNow_();
        expect(nested.getParent()).toBe(null);
        expect(fill(nested)).toBe('#59C059');
        workspace.undo(true);
        Blockly.Events.fireNow_();
        expect(nested.getParent()).toBe(root);
        expect(fill(nested)).toBe('#4DA54D');
    });

    test('XML reload recreates nested SVG paths with the same palette and leaves project XML unchanged', () => {
        const root = newBlock('operator_add');
        const child = newBlock('operator_mathop');
        child.setFieldValue('sqrt', 'OPERATOR');
        connect(root, 'NUM1', child);
        const originalXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
        const childId = child.id;
        Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(originalXml), workspace);
        const restored = workspace.getBlockById(childId);
        expect(restored instanceof Blockly.BlockSvg).toBe(true);
        expect(restored.getFieldValue('OPERATOR')).toBe('sqrt');
        expect(fill(restored)).toBe('#4DA54D');
        expect(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace))).toBe(originalXml);
    });

    test('numeric shadow paths remain white and editable inside nested math operators', () => {
        const root = newBlock('operator_add');
        const math = newBlock('operator_mathop');
        const number = newBlock('math_number');
        number.setShadow(true);
        number.setFieldValue('25', 'NUM');
        connect(math, 'NUM', number);
        connect(root, 'NUM1', math);
        expect(fill(math)).toBe('#4DA54D');
        expect(fill(number)).toBe('#FFFFFF');
        expect(number.getField('NUM').isCurrentlyEditable()).toBe(true);
        number.setFieldValue('36', 'NUM');
        expect(number.getFieldValue('NUM')).toBe('36');
        expect(fill(number)).toBe('#FFFFFF');
    });

    test('boolean nesting uses the same depth levels while preserving native shapes', () => {
        const root = newBlock('operator_and');
        const not = newBlock('operator_not');
        const equals = newBlock('operator_equals');
        connect(root, 'OPERAND1', not);
        connect(not, 'OPERAND', equals);
        expect(fill(root)).toBe('#59C059');
        expect(fill(not)).toBe('#4DA54D');
        expect(fill(equals)).toBe('#428E42');
        expect(equals.outputConnection.check_).toEqual(['Boolean']);
        expect(equals.svgPath_.getAttribute('d')).toBeTruthy();
    });

    test('keeps disabled patterns and restores the nested colours when enabled again', () => {
        workspace.options.disabledPatternId = 'operator-test-disabled';
        const root = newBlock('operator_add');
        const child = newBlock('operator_multiply');
        ['NUM1', 'NUM2'].forEach(input => {
            const shadow = newBlock('math_number');
            shadow.setShadow(true);
            connect(child, input, shadow);
        });
        connect(root, 'NUM1', child);
        child.setEnabled(false);
        expect(fill(child)).toBe('url(#operator-test-disabled)');
        expect(stroke(child)).toBe('url(#operator-test-disabled)');
        child.setEnabled(true);
        expect(fill(child)).toBe('#4DA54D');
        expect(stroke(child)).toBe('#307F30');
    });

    test('native selection, stack glow and insertion markers keep their visual states', () => {
        const root = newBlock('operator_add');
        const child = newBlock('operator_multiply');
        connect(root, 'NUM1', child);
        child.select();
        expect(child.getSvgRoot().getAttribute('class')).toContain('blocklySelected');
        expect(fill(child)).toBe('#4DA54D');
        child.setGlowBlock(true);
        expect(fill(child)).toBe('#3C9F3C');
        child.setGlowBlock(false);
        expect(fill(child)).toBe('#4DA54D');
        child.setGlowStack(true);
        expect(child.getSvgRoot().getAttribute('filter')).toBe('url(#blocklyStackGlowFilter)');
        child.setGlowStack(false);
        expect(child.getSvgRoot().hasAttribute('filter')).toBe(false);

        const marker = newBlock('operator_subtract');
        marker.setInsertionMarker(true);
        connect(child, 'NUM2', marker);
        expect(fill(marker)).toBe(Blockly.Colours.insertionMarker);
        expect(marker.svgPath_.getAttribute('fill-opacity')).toBe(`${Blockly.Colours.insertionMarkerOpacity}`);
    });

    test('does not cumulatively darken raw palettes or produce extra events when updating repeatedly', () => {
        const root = newBlock('operator_add');
        const child = newBlock('operator_multiply');
        connect(root, 'NUM1', child);
        Blockly.Events.fireNow_();
        workspace.clearUndo();
        const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
        for (let iteration = 0; iteration < 10; iteration++) child.updateColour();
        Blockly.Events.fireNow_();
        expect(fill(child)).toBe('#4DA54D');
        expect([child.colour_, child.colourSecondary_, child.colourTertiary_]).toEqual(
            ['#59C059', '#46B946', '#389438']);
        expect(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace))).toBe(xml);
        expect(workspace.undoStack_.length).toBe(0);
    });

    test('clamps very deep expressions and installs only once', () => {
        const getter = Blockly.BlockSvg.prototype.getColour;
        installOperatorNestingColours(Blockly);
        expect(Blockly.BlockSvg.prototype.getColour).toBe(getter);
        const operators = Array.from({length: 8}, () => newBlock('operator_add'));
        operators.slice(1).forEach((block, index) => connect(operators[index], 'NUM1', block));
        expect(fill(operators[5])).toBe('#2A5A2A');
        expect(fill(operators[6])).toBe(fill(operators[5]));
        expect(fill(operators[7])).toBe(fill(operators[5]));
    });
});
