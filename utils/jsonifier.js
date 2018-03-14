const decycle = require('./decycle.js');
const ignoredKeys = require('./ignored_keys');

function replacer (value, key) {
    if (ignoredKeys.indexOf(key) !== -1) {
        return void 0;
    }
    return value;
}

function stringifier (obj) {
    return JSON.stringify(decycle(obj, replacer), null, 4);
}

module.exports = stringifier;
