const insert = require('../../utils/insert.js');

function prepend () {
    insert.inside(this, arguments, true);
    return this;
}

module.exports = prepend;
