const $AST = require('../index.js');
const fs = require('fs');
const repl = require('repl');

const r = repl.start('> ');

r.context.$AST = $AST;
r.context.$ = new $AST(fs.readFileSync(__dirname + '/_code.js', 'utf8'));
