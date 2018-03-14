
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('next', () => {

    describe('finds the next sibling node for each match', function (expect) {
        let nextNodes = [];
        $('FunctionDeclaration').next().each(function (node) {
            nextNodes.push(node.type);
        });
        expect(nextNodes).toBe([
            'FunctionDeclaration',
            'ReturnStatement',
            'ExpressionStatement',
        ]);
    });

    describe('returns ParseTree', function (expect) {
        expect($().next().isParseTree).toBe(true);
    });

});
