
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('filter', () => {

    describe('filters by string', function (expect) {
        var matches = $('FunctionDeclaration').filter('#publicMethod');
        expect(matches.length).toBe(1);
        expect(matches[0].id.name).toBe('publicMethod');
    });

    describe('filters by function', function (expect) {
        var matches = $('FunctionDeclaration').filter(function (node) {
            return node.id && node.id.name === 'publicMethod';
        });
        expect(matches.length).toBe(1);
        expect(matches[0].id.name).toBe('publicMethod');
    });

    describe('filters by ParseTree instance', function (expect) {
        var matches = $('FunctionDeclaration').filter($('#publicMethod'));
        expect(matches.length).toBe(1);
        expect(matches[0].id.name).toBe('publicMethod');
    });

    describe('filters by node', function (expect) {
        var matches = $('FunctionDeclaration').filter($('#publicMethod')[0]);
        expect(matches.length).toBe(1);
        expect(matches[0].id.name).toBe('publicMethod');
    });

    describe('returns ParseTree', function (expect) {
        expect($().filter('#foo').isParseTree).toBe(true);
    });

});
