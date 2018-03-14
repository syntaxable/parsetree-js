
function parent () {
    let _this = this;
    _this.each(function (node, index) {
        let parent = node._ && node._._nodeParent;
        if (parent) {
            _this[index] = parent;
        }
    });
    return _this;
}

module.exports = parent;
