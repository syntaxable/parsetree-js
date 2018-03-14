
function has (selector) {
    let _this = this;

    if (!selector) {
        return _this.zero();
    }

    return _this.filter(function () {
        return !!_this.find(selector, this).length;
    });
}

module.exports = has;
