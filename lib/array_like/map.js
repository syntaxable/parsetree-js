
function map (iteratee) {
    if (typeof iteratee !== 'function') {
        return this;
    }

    let newSet = [];
    let newElem;

    for (let i = 0, len = this.length; i < len; i++) {
        newElem = iteratee.call(this[i], this[i], i, this);
        if (typeof newElem.type === 'string') {
            newSet.push(newElem);
        } else {
            throw new Error('.map fn should return an Element, not ' + typeof newElem);
        }
    }

    this.zero();
    return this.concat(newSet);
}

module.exports = map;
