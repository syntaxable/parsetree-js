
function first () {
    let firstNode = this[0];
    this.zero();
    return this.concat([firstNode]);
}

module.exports = first;
