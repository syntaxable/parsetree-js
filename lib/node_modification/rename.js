const nodeNames = require('../../utils/node_names.js');

/**
 * Rename all Identifiers with the same name as any of the currently matched nodes
 * @param {String} newName the new name
 */
function rename (newName) {
    let _this = this;

    let matchNameCollector = {};
    _this.each(function (match) {
        matchNameCollector[nodeNames.get(match)] = 1;
    });
    let matchNames = Object.keys(matchNameCollector);

    matchNames.forEach(function (oldName) {
        _this.$.walk(function (node) {
            if (node.type === 'Identifier' && node.name === oldName) {
                node.name = newName;
            }
        });
    });

    return _this;
}

module.exports = rename;
