
function zero () {
    while (this.length > 0) {
        this.shift();
    }

    return this;
}

module.exports = zero;
