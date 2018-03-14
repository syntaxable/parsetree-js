
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST('function originalCode (){}');

describe('after', () => {

    describe('insert new content of various types', function (expect) {
        let testCode = 'let x = 99;';
        expect($('VariableDeclarator').length).toBe(0);

        $('FunctionDeclaration').after([
            {
                type: 'VariableDeclaration',
                start: '0', end: '11',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 10,
                        id: {
                            type: 'Identifier',
                            start: 4,
                            end: 5,
                            name: 'x',
                        },
                        init: {
                            type: 'Literal',
                            start: 8,
                            end: 10,
                            value: 99,
                            raw: '99',
                        },
                    }
                ],
                kind: 'let',
            },
            testCode,
            [testCode],
            function () {
                return testCode
            },
        ]);

        expect($('VariableDeclarator').length).toBe(4);

        $.getTree().program.body.forEach(function (node, index) {
            if (index === 0) {
                expect(node.type).toBe('FunctionDeclaration');
            } else {
                expect(node.type).toBe('VariableDeclaration');
            }
        });
    });

    describe('returns ParseTree', function (expect) {
        expect($().after({}).isParseTree).toBe(true);
    });

});
