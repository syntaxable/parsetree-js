
function index (n) {
    n = Array.isArray(n) ? NaN : parseInt(n, 10); // prevent parsing array of numbers
    let results = isNaN(n) ? [] : [n >= 0 ? this[n] : this[this.length + n]];
    this.zero();
    return this.concat(results);
}

module.exports = index;
