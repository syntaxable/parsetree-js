const FeatherTest = require('feather-test');
const glob = require('glob');
const utils = require('seebigs-utils');

let args = utils.args();
let specs = './specs';

if (args.run) {
    let matcher = __dirname + '/' + specs + '/**/*' + args.run + '**';
    specs = glob.sync(matcher);
    console.log(specs);
}

const tests = new FeatherTest({
    specs: specs,
});

tests.run();
