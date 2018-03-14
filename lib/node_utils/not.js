const selectorMatcher = require('../../utils/selector_matcher.js');

function not (selector) {
    if (!selector) {
        return this;
    }

    let isMatch = selectorMatcher(selector);

    function criteria (node, i) {
        return !isMatch(node, i);
    }

    return this.filter(criteria);
}

module.exports = not;
