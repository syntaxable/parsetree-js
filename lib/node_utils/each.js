const utilsEach = require('seebigs-each');

function each (iteratee) {
    utilsEach(this, iteratee);
    return this;
}

module.exports = each;
