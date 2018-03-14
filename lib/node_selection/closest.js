
function closest (selector, context) {
    if (!selector) {
        return this;
    }

    var allMatches = this.find(selector, context);
    var onlyClosest = [];
    var node;

    for (var i = 0, len = this.length; i < len; i++) {
        node = this[i];
        while (node && node !== context) {
            if (Array.prototype.indexOf.call(allMatches, node) !== -1) {
                onlyClosest.push(node);
                break;
            }

            node = node._ && node._._nodeParent;
        }
    }

    this.zero();
    return this.concat(onlyClosest);
}

module.exports = closest;
