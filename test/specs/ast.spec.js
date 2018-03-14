
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST('function originalCode (){ let me = "awesome" }');

describe('ast', () => {

    describe('getTree', () => {

        describe('returns raw AST', function (expect) {
            expect($.getTree().type).toBe('File');
            expect($().$.getTree().type).toBe('File');
        });

    });

    describe('parse', () => {

        let $a = new $AST('function originalCode (){}');

        describe('sets new AST', function (expect) {
            expect($a.getTree().type).toBe('File');
            $a.parse({ type: 'NEW' });
            expect($a.getTree().type).toBe('NEW');
        });

    });

    describe('generate', () => {

        describe('converts AST into code', function (expect) {
            let code = $.generate();
            expect(code).toBe('function originalCode (){ let me = "awesome" }');
        });

    });

    describe('minify', () => {

        describe('converts AST into minified code', function (expect) {
            let code = $.minify();
            expect(code).toBe("function originalCode(){}");
        });

    });

    describe('toString', () => {

        describe('converts AST into a readable JSON string', function (expect) {
            let str = $.toString();
            expect(str.indexOf('{\n    "program": {\n        "type": "Program"')).toBe(0);
        });

        describe('protects against noisy and circular references', function (expect) {
            let str = $().$.toString();
            expect(str.indexOf('"_"')).toBe(-1);
        });

    });

    describe('walk', () => {

        describe('walk provides a function as an iterator', function (expect) {
            expect(typeof $.walk).toBe('function');
            expect(typeof $().$.walk).toBe('function');
        });

    });

});
