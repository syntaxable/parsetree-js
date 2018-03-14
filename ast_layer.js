const arrSlice = Array.prototype.slice;
// const escodegen = require('escodegen');
const generator = require('./utils/generator.js');
const minifier = require('./utils/minifier.js');
const parser = require('./utils/parser.js');
const jsonifier = require('./utils/jsonifier.js');
const walker = require('./utils/walker.js');

/**
 * @param {String|AST} rawCode the code to be parsed or the pre-parsed AST
 */
function parseCode (rawCode, options) {
    let code = {};
    let comments = [];
    let tokens = [];
    // let opts = Object.assign({
    //     // locations: true,
    //     sourceType: 'module',
    //     ranges: true,
    //     onComment: comments,
    //     onToken: tokens,
    //     // preserveParens: true,
    // }, options);

    // code = parser(rawCode, opts);
    code = parser(rawCode);

    return {
        code: code,
        comments: comments,
        tokens: tokens,
    };
}

function AstLayer (code) {
    let __ast = {};

    function getTree () {
        return __ast; // just return the tree
    }

    function parse (rawCode, options) {
        rawCode = rawCode || ''; // catch all falsey values
        let comments = [];
        let tokens = [];
        let parsed = parseCode(rawCode, options);
        // escodegen.attachComments(parsed.code, parsed.comments, parsed.tokens);
        walk(); // add parent refs to the tree
        return __ast = parsed.code;
    }

    function generate (options) {
        options = options || { comment: true };
        return generator(__ast, options);
    }

    function minify (options) {
        options = options || {};
        // minifier.tryAST(__ast, options)
        var min = minifier.asString(generate(), options);
        return minifier.optimize(min);
    }

    function toString (obj) {
        return jsonifier(obj || __ast);
    }

    function walk () {
        return walker(__ast).apply(this, arrSlice.apply(arguments));
    }

    // initialize with code from constructor if passed
    if (code) {
        parse(code);
    }

    return {
        getTree,
        generate,
        minify,
        parse,
        toString,
        walk,
    };
}

module.exports = AstLayer;
