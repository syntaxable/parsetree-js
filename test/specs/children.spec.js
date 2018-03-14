
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('children', () => {

    describe('finds all child nodes when body is an Array', function (expect) {
        let childNodes = [];
        $('#publicMethod BlockStatement').children().each(function (node) {
            childNodes.push(node.type);
        });
        expect(childNodes).toBe([
            'ExpressionStatement',
            'VariableDeclaration',
            'VariableDeclaration',
            'FunctionDeclaration',
            'ReturnStatement',
        ]);
    });

    describe('finds all child nodes when body is an Object containing a body Array', function (expect) {
        let childNodes = [];
        $('#publicMethod').children().each(function (node) {
            childNodes.push(node.type);
        });
        expect(childNodes).toBe([
            'VariableDeclaration',
            'FunctionDeclaration',
            'ReturnStatement',
        ]);
    });

    describe('finds all child nodes and filters by selector', function (expect) {
        let childNodes = [];
        $('#publicMethod BlockStatement').children('#inner').each(function (node) {
            childNodes.push(node.type);
        });
        expect(childNodes).toBe([
            'FunctionDeclaration',
        ]);
    });

    describe('returns ParseTree', function (expect) {
        expect($().children().isParseTree).toBe(true);
    });

});
