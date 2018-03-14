const childNodes = require('../../utils/child_nodes.js');

function children (selector) {
    let childrenArr = [];

    this.each(function (node) {
        childrenArr = childrenArr.concat(childNodes.get(node));
    });

    this.zero();
    this.concat(childrenArr);

    return selector ? this.filter(selector) : this;
}

module.exports = children;
