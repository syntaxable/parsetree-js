
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('first', () => {

    describe('reduces the collection to just the first matched element', function (expect) {
        let $first = $('FunctionDeclaration').first();
        expect($first.length).toBe(1);
        expect($first[0].id.name).toBe('privateMethod');
    });

});
