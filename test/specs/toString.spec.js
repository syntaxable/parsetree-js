
const $AST = require('../../index.js');
const fs = require('fs');

const $ = new $AST('function originalCode (){ let me = "awesome" }');

describe('toString', () => {

    describe('converts a ParseTree instance into a readable JSON string', function (expect) {
        let str = $('#originalCode').toString();
        expect(str.indexOf('{\n    "0": {\n        "type": "FunctionDeclaration",')).toBe(0);
    });

    describe('protects against noisy and circular references', function (expect) {
        let str = $('#originalCode').toString();
        expect(str.indexOf('"_"')).toBe(-1);
    });

});
