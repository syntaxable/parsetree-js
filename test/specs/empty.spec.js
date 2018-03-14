const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const codeEmpty = fs.readFileSync(__dirname + '/../_code_empty.js', 'utf8');
const $ = new $AST(code);

describe('empty', () => {

    describe('clears all child nodes from each match', function (expect) {
        $('#publicMethod').add('#privateMethod').empty();
        expect($.generate()).toBe(codeEmpty);
    });

    describe('returns ParseTree', function (expect) {
        let $ = new $AST();
        expect($().rename({}).isParseTree).toBe(true);
    });

});
