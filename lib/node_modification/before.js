const insert = require('../../utils/insert.js');

function before () {
    insert.asSibling(this, arguments, true);
    return this;
}

module.exports = before;
