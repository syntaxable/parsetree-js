const selectorMatcher = require('../../utils/selector_matcher.js');

function filterNodes (collection, selector) {
    let matches = [];
    let isMatch = selectorMatcher(selector);

    for (let i = 0, len = collection.length; i < len; i++) {
        if (isMatch(collection[i], i)) {
            matches.push(collection[i]);
        }
    }

    return matches;
}

function filter (selector) {
    if (!this.length || !selector) {
        return this.zero();
    }

    let results = filterNodes(this, selector);
    this.zero();
    return this.concat(results);
}

module.exports = filter;
