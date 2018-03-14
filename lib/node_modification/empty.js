const childNodes = require('../../utils/child_nodes.js');
const each = require('seebigs-each');
const insert = require('../../utils/insert.js');

/**
 * Delete all child nodes from each of the matched nodes
 */
function empty () {
    this.each(function (match) {
        childNodes.set(match, []);
    });
    return this;
}

module.exports = empty;
