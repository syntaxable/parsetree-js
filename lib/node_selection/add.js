
function add (selector, context) {
    if (!selector) {
        return this;
    }

    return this.concat(this.find(selector, context));
}

module.exports = add;
