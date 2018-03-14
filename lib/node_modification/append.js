const insert = require('../../utils/insert.js');

function append () {
    insert.inside(this, arguments, false);
    return this;
}

module.exports = append;
