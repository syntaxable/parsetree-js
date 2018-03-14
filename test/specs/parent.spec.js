
const $AST = require('../../index.js');
const fs = require('fs');
const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');

describe('parent', function (expect) {
    const $ = new $AST(code);
    var parentedCollection = $('#foo').parent().parent();
    expect(parentedCollection[0].type).toBe('Program');
    expect(parentedCollection[1].id.name).toBe('privateMethod');
    expect(parentedCollection[2].type).toBe('BlockStatement');
});
