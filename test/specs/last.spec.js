
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('last', () => {

    describe('reduces the collection to just the last matched element', function (expect) {
        let $last = $('FunctionDeclaration').last();
        expect($last.length).toBe(1);
        expect($last[0].id.name).toBe('publicMethod');
    });

});
