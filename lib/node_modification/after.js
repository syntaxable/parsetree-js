const insert = require('../../utils/insert.js');

function after () {
    insert.asSibling(this, arguments, false);
    return this;
}

module.exports = after;
