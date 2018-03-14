const nodeNames = require('./node_names.js');

function selectorMatcher (selector) {
    let selectorType = typeof selector;

    // HANDLE: string selector
    if (selectorType === 'string') {
        let type = (selector.match(/^(\w+)/) || [])[1];
        let id = (selector.match(/#([\w-]+)/) || [])[1];
        let attr = (selector.match(/\[([\w-\.]+)=?([\w-]+)?\]/) || []);
        let attrProps;
        let attrPropsLen;
        let attrValue;
        if (attr.length) {
            attrProps = attr[1].split('.');
            attrPropsLen = attrProps.length;
            attrValue = attr[2];
        }

        return function (node) {
            if (!node || typeof node.type !== 'string') {
                return false;
            }

            let nodeType = node.type;

            let matchNodeType = false;
            if (type) {
                if (nodeType === type) {
                    matchNodeType = true;
                }
            } else {
                matchNodeType = true;
            }

            let matchId = false;
            if (id) {
                let idName = nodeNames.get(node);
                if (idName === id) {
                    matchId = true;
                }
            } else {
                matchId = true;
            }

            let matchAttr = false;
            if (attr) {
                let nodeVal = node;
                for (let i = 0; i < attrPropsLen; i++) {
                    nodeVal = nodeVal[attrProps[i]];
                    if (!nodeVal) { break; }
                }
                if (attrValue) {
                    if (Array.isArray(nodeVal)) {
                        if (nodeVal.length === parseInt(attrValue, 10)) {
                            matchAttr = true;
                        }
                    } else {
                        if (('' + nodeVal) === attrValue) {
                            matchAttr = true;
                        }
                    }

                } else {
                    if (typeof nodeVal !== 'undefined') {
                        matchAttr = true;
                    }
                }
            } else {
                matchAttr = true;
            }

            return matchNodeType && matchId && matchAttr;
        };

    // HANDLE: function
    } else if (selectorType === 'function') {
        return function (node, i) {
            return !!selector.call(node, node, i);
        };

    // HANDLE: node
    } else if (typeof selector.type === 'string') {
        return function (node) {
            return selector === node;
        };

    // HANDLE: array
    } else if (selector.length) {
        return function (node) {
            return selector.indexOf(node) !== -1;
        };
    }

    return function () {
        return false;
    }
}

module.exports = selectorMatcher;
