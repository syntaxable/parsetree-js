const AstLayer = require('../../ast_layer.js');
const generator = require('../../utils/generator.js');
const insert = require('../../utils/insert.js');

function wrap (code) {
    if (typeof code !== 'string') {
        throw new Error('The code passed to wrap must be a string');
    }

    this.each(function (match) {
        let innerString = generator(match);
        if (innerString.slice(-1) === ';') {
            innerString = innerString.slice(0, -1);
        }
        const wrappedCode = code.replace(/___/g, innerString);
        const wrapperProgram = new AstLayer(wrappedCode).getTree();
        insert.replace([match], wrapperProgram.program.body);
    });

    return this;
}

module.exports = wrap;
