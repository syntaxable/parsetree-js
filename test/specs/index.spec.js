
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('index', () => {

    describe('finds zero index', function (expect) {
        var matches = $('FunctionDeclaration').index(0);
        expect(matches.length).toBe(1);
        expect(matches[0] && matches[0].id.name).toBe('privateMethod');
    });

    describe('finds positive index', function (expect) {
        var matches = $('FunctionDeclaration').index(2);
        expect(matches.length).toBe(1);
        expect(matches[0] && matches[0].id.name).toBe('publicMethod');
    });

    describe('finds negative index', function (expect) {
        var matches = $('FunctionDeclaration').index(-2);
        expect(matches.length).toBe(1);
        expect(matches[0] && matches[0].id.name).toBe('inner');
    });

    describe('fails gracefully', function (expect) {
        var matches = $('FunctionDeclaration').index();
        expect(matches.length).toBe(0);
    });

    describe('returns ParseTree', function (expect) {
        expect($().each().isParseTree).toBe(true);
    });

});
