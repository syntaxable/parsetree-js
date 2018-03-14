const optimizeJS = require('optimize-js');
const uglify = require('uglify-es');

function tryAST (ast, options) {
    let result = {};

    try {
        const convertedAST = uglify.AST_Node.from_mozilla_ast(ast);
        result = uglify.minify(convertedAST, options);
    } catch (e) {
        // console.log('Warning: unable to uglify from AST. Must generate to string and re-parse.');
    }

    return result.code;
}

function asString (str, options) {
    let result = {};

    try {
        result = uglify.minify(str, options)
    } catch (e) {
        console.log('Warning: unable to uglify from String.');
    }

    return result.code;
}

function optimize (str) {
    try {
        str = optimizeJS(str, {});
    } catch (e) {
        console.log('Warning: failed to optimize js');
    }

    return str;
}

module.exports = {
    asString, asString,
    optimize: optimize,
    tryAST: tryAST,
};
