const print = require('recast').print;

function generate (ast, options) {
    return print(ast, options).code;
}

module.exports = generate;
