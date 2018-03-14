const insert = require('../../utils/insert.js');

/**
 * Delete all matched nodes (and their children) from the tree
 */
function remove () {
    insert.replace(this, []);
    return this;
}

module.exports = remove;
