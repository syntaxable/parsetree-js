const $AST = require('../../index.js');

const byId = [
    {
        code: 'let bar = bar, foo = foo;',
        type: 'VariableDeclarator',
    },
    {
        code: 'foo = foo;',
        type: 'AssignmentExpression',
    },
    {
        code: 'let bar = function foo() {}',
        type: 'FunctionExpression',
    },
    {
        code: 'function foo() { bar.foo() }',
        type: 'FunctionDeclaration',
    },
    {
        code: 'foo(foo);',
        type: 'CallExpression',
    },
    {
        code: '(function bar() { return foo; })',
        type: 'ReturnStatement',
    },
    {
        code: 'foo[foo]',
        type: 'MemberExpression',
    },
    {
        code: 'foo.foo = bar',
        type: 'MemberExpression',
    },
    {
        code: 'foo',
        type: 'ExpressionStatement',
    },
    {
        code: 'new foo()',
        type: 'NewExpression',
    },
];

const byTypes = [
    {
        code: ';',
        types: ['EmptyStatement'],
    },
    {
        code: 'debugger;',
        types: ['DebuggerStatement'],
    },
    {
        code: 'foo',
        types: ['Identifier', 'ExpressionStatement'],
    },
    {
        code: '123',
        types: ['Literal', 'ExpressionStatement'],
    },
    {
        code: 'while(true){}',
        types: ['WhileStatement', 'BlockStatement'],
    },
    {
        code: 'for(x in y){ break; }',
        types: ['ForInStatement', 'BreakStatement'],
    },
    {
        code: 'for(var i=0; i<len; i++){ continue; }',
        types: ['ForStatement', 'ContinueStatement'],
    },
    {
        code: 'if(true){}else{}',
        types: ['IfStatement'],
    },
    {
        code: 'throw "err"',
        types: ['ThrowStatement'],
    },
    {
        code: 'try{}catch(e){}',
        types: ['TryStatement', 'CatchClause'],
    },
    {
        code: 'function fn () {}',
        types: ['FunctionDeclaration'],
    },
    {
        code: 'let x = function fn () {}',
        types: ['FunctionExpression'],
    },
    {
        code: '() => {}',
        types: ['ArrowFunctionExpression'],
    },
    {
        code: 'let x = y',
        types: ['VariableDeclaration', 'VariableDeclarator'],
    },
    {
        code: 'this',
        types: ['ThisExpression'],
    },
    {
        code: '[a,b]',
        types: ['ArrayExpression'],
    },
    {
        code: 'x = { a: 123 }',
        types: ['ObjectExpression', 'AssignmentExpression', 'Property'],
    },
    {
        code: '1 === 1',
        types: ['BinaryExpression'],
    },
    {
        code: 'typeof x',
        types: ['UnaryExpression'],
    },
    {
        code: 'x++',
        types: ['UpdateExpression'],
    },
    {
        code: 'x && y',
        types: ['LogicalExpression'],
    },
    {
        code: 'a.b',
        types: ['MemberExpression'],
    },
    {
        code: 'true ? a : b',
        types: ['ConditionalExpression'],
    },
    {
        code: 'new Error()',
        types: ['NewExpression'],
    },
];

describe('selectors', function () {

    describe('byId', function () {
        byId.forEach(function (node) {
            describe(node.type, function (expect) {
                let $ = new $AST(node.code);
                if (node.print) {
                    console.log($.ast.toString());
                }
                let $match = $('#foo');
                expect($match.length).toBe(1);
                $match.length && expect($match[0].type).toBe(node.type);
            });
        });
    });

    describe('byTypes', function () {
        byTypes.forEach(function (node) {
            let $ = new $AST(node.code);
            if (node.print) {
                console.log($.ast.toString());
            }
            node.types.forEach(function (nodeType) {
                describe(nodeType, function (expect) {
                    let $match = $(nodeType);
                    expect($match.length).toBe(1);
                    $match.length && expect($match[0].type).toBe(nodeType);
                });
            });
        });
    });

});
