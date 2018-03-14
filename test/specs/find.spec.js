
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('find', () => {

    describe('avoids bad matches', function (expect) {
        var match = $('BAD');
        expect(match.length).toBe(0);
    });

    describe('by type', function (expect) {
        var match = $('  VariableDeclarator  ');
        expect(match.length).toBe(4);
        match.length && expect(match[0].type).toBe('VariableDeclarator');
    });

    describe('by id', function (expect) {
        var match = $(' #foo ');
        expect(match.length).toBe(3);
        match.length && expect(match[0].type).toBe('VariableDeclarator');
        expect($('#action').length).toBe(1, '#action');
    });

    describe('by attr', function (expect) {
        var match = $(' [init.raw=123] ');
        expect(match.length).toBe(1);
        match.length && expect(match[0].type).toBe('VariableDeclarator');
    });

    describe('by attr=length', function (expect) {
        var match = $('FunctionDeclaration[params=2]');
        expect(match.length).toBe(1);
        match.length && expect(match[0].type).toBe('FunctionDeclaration');
    });

    describe('by attr (is set)', function (expect) {
        var match = $('[computed]');
        expect(match.length).toBe(2);
        match.length && expect(match[0].type).toBe('MemberExpression');
    });

    describe('by type, id, attr', function (expect) {
        var match = $('FunctionDeclaration#inner[generator=false');
        expect(match.length).toBe(1);
        match.length && expect(match[0].type).toBe('FunctionDeclaration');
    });

    describe('by type, attr, id', function (expect) {
        var match = $('FunctionDeclaration[generator=false]#inner');
        expect(match.length).toBe(1);
        match.length && expect(match[0].type).toBe('FunctionDeclaration');
    });

    describe('by descendant selectors', function (expect) {
        var match = $('Program #publicMethod VariableDeclaration[kind=let]');
        expect(match.length).toBe(1);
        match.length && expect(match[0].type).toBe('VariableDeclaration');
    });

    describe('by node', function (expect) {
        var match = $({ type: 'MyNode', body: [] });
        expect(match.length).toBe(1);
        match.length && expect(match[0].type).toBe('MyNode');
    });

    describe('by array of nodes', function (expect) {
        var match = $([{ type: 'MyNode1', body: [] }, { type: 'MyNode2', body: [] }]);
        expect(match.length).toBe(2);
        match.length && expect(match[0].type).toBe('MyNode1');
    });

    describe('by ParseTree instance', function (expect) {
        var match = $($('#foo'));
        expect(match.length).toBe(3);
        match.length && expect(match[0].type).toBe('VariableDeclarator');
    });

    describe('with context nonsense', function (expect) {
        var match = $('VariableDeclaration', new Date());
        expect(match.length).toBe(0);
    });

    describe('with context type', function (expect) {
        var match = $('VariableDeclaration', 'FunctionDeclaration');
        expect(match.length).toBe(2);
        match.length && expect(match[0].type).toBe('VariableDeclaration');
    });

    describe('with context id', function (expect) {
        var match = $('FunctionDeclaration', '#publicMethod');
        expect(match.length).toBe(1);
        match.length && expect(match[0].type).toBe('FunctionDeclaration');
    });

    describe('with context attr', function (expect) {
        var match = $('MemberExpression', '[operator==]');
        expect(match.length).toBe(1);
        match.length && expect(match[0].type).toBe('MemberExpression');
    });

    describe('with context empty collection', function (expect) {
        var match = $('FunctionDeclaration', []);
        expect(match.length).toBe(0);
    });

    describe('with context isParseTree', function (expect) {
        var match = $('FunctionDeclaration', $('#publicMethod'));
        expect(match.length).toBe(1);
        match.length && expect(match[0].type).toBe('FunctionDeclaration');
    });

    describe('returns ParseTree', function (expect) {
        expect($().isParseTree).toBe(true, 'with undefined');
        expect($('#foo').isParseTree).toBe(true, 'with string');
    });

});
