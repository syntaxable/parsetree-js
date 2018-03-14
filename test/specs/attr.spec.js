const $AST = require('../../index.js');

describe('attr', () => {

    describe('sets new attributes', function (expect) {
        const $ = new $AST('function originalCode() { var originalCode = false; }');
        $('#originalCode').attr('little.boy.blue', 'horny').each(function (node) {
            expect(node.little && node.little.boy.blue).toBe('horny', node.type);
        });
    });

    describe('overrides existing attributes', function (expect) {
        const $ = new $AST('function originalCode() {}');
        expect($('#originalCode').attr('id.name')).toBe('originalCode');
        $('#originalCode').attr('id.name', 'yoMomma');
        expect($('#yoMomma').attr('id.name')).toBe('yoMomma');
    });

    describe('returns ParseTree (when setting)', function (expect) {
        const $ = new $AST('function originalCode() {}');
        expect($('#originalCode').attr('foo', 'bar').isParseTree).toBe(true);
    });

});
