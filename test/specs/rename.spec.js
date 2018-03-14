const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('rename', () => {

    describe('finds and renames all Identifiers', function (expect) {
        let numFoo = (code.match(/foo/g) || []).length;
        $('#foo').rename('renamed');
        expect(($.generate().match(/renamed/g) || []).length).toBe(numFoo);
    });

    describe('returns ParseTree', function (expect) {
        let $ = new $AST();
        expect($().rename({}).isParseTree).toBe(true);
    });

});
