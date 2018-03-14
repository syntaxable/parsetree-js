
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('siblings', () => {

    describe('finds all sibling nodes (ingoring the current node)', function (expect) {
        let siblingNodes = [];
        $('#publicMethod').last().siblings().each(function (node) {
            siblingNodes.push(node.type);
        });
        expect(siblingNodes).toBe([
            'VariableDeclaration',
            'FunctionDeclaration',
            'ExpressionStatement',
        ]);
    });

    describe('returns ParseTree', function (expect) {
        expect($().siblings().isParseTree).toBe(true);
    });

});
