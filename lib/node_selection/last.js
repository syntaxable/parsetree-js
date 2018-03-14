
function last () {
    let lastNode = this[this.length - 1];
    this.zero();
    return this.concat([lastNode]);
}

module.exports = last;
