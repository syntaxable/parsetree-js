
function is (selector) {
    return !!(selector && this.filter(selector).length);
}

module.exports = is;
