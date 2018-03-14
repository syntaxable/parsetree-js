/**
 * Get all child nodes as an Array
 */
function get (node) {
    if (node && node.body) {
        if (Array.isArray(node.body)) {
            return node.body;
        } else if (Array.isArray(node.body.body)) {
            return node.body.body;
        }
    }
    return [];
}

/**
 * Set the child nodes to be the Array of children given
 */
function set (node, children) {
    if (node && node.body) {
        if (Array.isArray(node.body)) {
            node.body = children;
        } else if (Array.isArray(node.body.body)) {
            node.body.body = children;
        }
    }
}

module.exports = {
    get,
    set,
};
