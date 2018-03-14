/**
 * Add new nodes into the existing collection (but only if they are not already inside)
 */
function concat () {
    let _this = this;

    let i, len, item;
    Array.prototype.slice.call(arguments).forEach(function (collection) {
        if (collection && collection.length) {
            for (i = 0, len = collection.length; i < len; i++) {
                item = collection[i];
                if (_this.indexOf(item) === -1) {
                    _this.push(item);
                }
            }
        }
    });

    return _this;
}

module.exports = concat;
