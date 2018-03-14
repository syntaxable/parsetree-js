const each = require('seebigs-each');
const ignoredKeys = require('./ignored_keys');

function walk (node, nodeKey, iteratee, skipNode) {
    each(node, function (value, key) {
        if (value && ignoredKeys.indexOf(key) === -1) {
            if (Array.isArray(value)) {
                each(value, function (arrMember, arrIndex) {
                    if (arrMember && typeof arrMember.type === 'string') {
                        arrMember._ = {
                            _containerKey: arrIndex,
                            _containerParent: value,
                            _nodeKey: key,
                            _nodeParent: node,
                        };
                        walk(arrMember, arrIndex, iteratee);
                    }
                });
            }
            else if (typeof value.type === 'string') {
                value._ = {
                    _containerKey: key,
                    _containerParent: node,
                    _nodeKey: key,
                    _nodeParent: node,
                };
                walk(value, key, iteratee);
            }
        }
    });
    if (typeof iteratee === 'function' && !skipNode) {
        iteratee(node, nodeKey);
    }
}

function walker (ast, skipTopNode) {
    return function (iteratee) {
        walk(ast, null, iteratee, skipTopNode);
    };
}

module.exports = walker;
