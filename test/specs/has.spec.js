
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('has', () => {

    describe('reduces matched set to only those that contain matching children', function (expect) {
        let matches = $('FunctionDeclaration').has('VariableDeclaration');
        expect(matches.length).toBe(2);
    });

    describe('returns ParseTree', function (expect) {
        expect($().has('#foo').isParseTree).toBe(true);
    });

});
