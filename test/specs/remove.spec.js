const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('remove', () => {

    describe('deletes all matched nodes from the tree', function (expect) {
        expect($('#foo').length).toBe(3);
        $('#foo').remove();
        expect($('#foo').length).toBe(0);
    });

    describe('returns ParseTree', function (expect) {
        let $ = new $AST();
        expect($().rename({}).isParseTree).toBe(true);
    });

});
