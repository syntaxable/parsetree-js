const $AST = require('../../index.js');

const codeTypes = [
    {
        type: 'Quotes',
        before: '"___"',
        after: ' "foo()" ',
    },
    {
        type: 'ExpressionStatement',
        before: '___',
        after: ' foo(); ',
    },
    {
        type: 'CallExpression Arguments',
        before: 'hello(___)',
        after: ' hello(foo()); ',
    },
    {
        type: 'MemberExpression Property',
        before: 'hello[___]',
        after: ' hello[foo()]; ',
    },
    {
        type: 'ExpressionStatement',
        before: 'hello(); ___; hello();',
        after: ' hello();foo();hello(); ',
    },
    {
        type: 'TryStatement',
        before: 'try { ___; } catch(e) {}',
        after: ' try { foo(); } catch(e) {} ',
    },
    {
        type: 'BinaryExpression',
        before: 'hello + ___ + hello',
        after: ' hello + foo() + hello; ',
    },
    {
        type: 'IIFE',
        before: '(function(){___})()',
        after: ' (function() {foo()})(); ',
    },
    {
        type: 'AssignmentExpression',
        before: 'module.exports = ___',
        after: ' module.exports = foo(); ',
    },
];

describe('wrap', () => {

    describe('wraps matched nodes with the provided code elements', function () {
        codeTypes.forEach(function (code) {
            describe(code.type, function (expect) {
                let $ = new $AST('function originalCode (){ foo(); }');
                let $test = new $AST('function originalCode (){' + code.after + '}');

                $('#foo').wrap(code.before);

                expect($.minify()).toBe($test.minify());
            });
        });
    });

    describe('can wrap the Program node', function () {
        codeTypes.forEach(function (code) {
            describe(code.type, function (expect) {
                let $ = new $AST(' foo(); ');
                let $test = new $AST(code.after);
                $('Program').wrap(code.before);
                expect($.minify()).toBe($test.minify());
            });
        });
    });

    describe('returns ParseTree', function (expect) {
        let $ = new $AST();
        expect($().wrap('').isParseTree).toBe(true);
    });

});
