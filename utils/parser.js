const recastParse = require('recast').parse;

function printAdditionalErrorContext (rawCode, err) {
    const errFirstLine = err.stack.split('\n')[0];
    let errLine = errFirstLine.substr(errFirstLine.lastIndexOf('(') + 1);
    const errLineSplit = errLine.split(':');
    errLine = parseInt(errLineSplit[0]);
    const errCol = parseInt(errLineSplit[1]);
    const badLine = rawCode.split('\n')[errLine - 1];
    const errOut = badLine ? badLine.substring(errCol - 100, errCol + 100) : rawCode;
    console.log('\nError parsing code at:');
    console.log(errOut);
    console.log();
}

function parser (code, options) {
    try {
        return typeof code === 'string' ? recastParse(code, options) : code;

    } catch (err) {
        if (typeof code === 'string') {
            printAdditionalErrorContext(code, err);
        }
        throw new SyntaxError(err.message);
    }
}

module.exports = parser;
