
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('is', () => {

    describe('returns true when it does match', function (expect) {
        expect($('VariableDeclaration').is('[kind=let]')).toBe(true);
    });

    describe('returns false when it does not match', function (expect) {
        expect($('VariableDeclaration').is('#bad')).toBe(false);
    });

});
