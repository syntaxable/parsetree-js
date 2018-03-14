const $AST = require('../../index.js');

describe('removeAttr', () => {

    describe('overrides attribute value with undefined', function (expect) {
        const $ = new $AST('function foo () { var originalCode = false; }');
        expect($('#originalCode').attr('init.value')).toBe(false);
        $('#originalCode').removeAttr('init.value');
        expect($('#originalCode').attr('init.value')).toBe(void 0);
    });

    describe('returns ParseTree', function (expect) {
        const $ = new $AST('function originalCode() {}');
        expect($('#originalCode').removeAttr('foo').isParseTree).toBe(true);
    });

});
