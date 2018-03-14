const selectorMatcher = require('../../utils/selector_matcher.js');
const walker = require('../../utils/walker.js');

// always returns an array of nodes to use as context
function normalizeContext (_this, context) {
    if (typeof context === 'string') {
        return findByString(_this, context);
    }

    if (context.isParseTree) {
        return context;
    }

    if (Array.isArray(context)) {
        return context;
    }

    if (typeof context === 'object') {
        return [context];
    }

    return [];
}

function findByString (_this, selector, context) {
    let results = [];
    let contextWalk = _this.$.walk;

    if (context) {
        context = normalizeContext(_this, context);

        if (context.length > 1) {
            for (let i = 0, len = context.length; i < len; i++) {
                results = results.concat(findByString(_this, selector, context[i]));
            }
            return results;

        } else if (context.length === 1) {
            contextWalk = walker(context[0], true);

        } else {
            contextWalk = walker([]);
        }
    }

    // HANDLE: Single selector
    if ((/^[\.#\w-\[=\]]+$/).test(selector)) {
        let isMatch = selectorMatcher(selector);
        contextWalk(function (node) {
            if (isMatch(node)) {
                results.push(node);
            }
        });

    // HANDLE: Complex selectors
    } else {
        // just handle descendant selectors for now (no direct child, etc.)
        let selSplit = selector.split(' ');
        if (selSplit.length > 1) {
            results = selSplit.shift();
            while (selSplit.length) {
                let nextSelector = selSplit.shift();
                results = findByString(_this, nextSelector, results);
            }
        }
    }

    return results;
}

// returns an Array of matching nodes
function find(selector, context) {
    if (!selector) {
        return [];
    }

    let results = [];

    // HANDLE: string
    if (typeof selector === 'string') {
        results = findByString(this, selector.replace(/\s+/g, ' ').trim(), context);

    // HANDLE: node
    } else if (typeof selector.type === 'string') {
        results = [selector];

    // HANDLE: array of nodes, ParseTree instance
    } else if (selector.length) {
        let arr = [];

        for (let i = 0, len = selector.length, item; i < len; i++) {
            item = selector[i];
            if (typeof item.type === 'string') {
                arr.push(item);
            }
        }

        results = arr;
    }

    return results;
}

module.exports = find;
