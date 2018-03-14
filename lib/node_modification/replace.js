const insert = require('../../utils/insert.js');

function replace (content) {
    insert.replace(this, content);
    return this;
}

module.exports = replace;
