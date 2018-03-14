
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('map', () => {

    describe('remaps the current collection', function (expect) {
        var matches = $('FunctionDeclaration').map(function (oldNode, index) {
            return {
                type: 'fake',
                ndx: index
            };
        });
        expect(matches.length).toBe(3);
        expect(matches[2].type).toBe('fake');
        expect(matches[2].ndx).toBe(2);
    });

    describe('returns ParseTree', function (expect) {
        expect($().map(function(){}).isParseTree).toBe(true);
    });

});
