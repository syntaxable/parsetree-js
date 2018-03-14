const childNodes = require('./child_nodes.js');
const each = require('seebigs-each');
const parse = require('./parser.js');
const recast = require('recast');

/**
 * Normalizes different types of content input into the same thing
 * Always returns an Array of nodes
 */
function normalizeContent (toBeAdded, flattenedArguments, matches) {
    each(flattenedArguments, function (content, i) {
        let contentType = typeof content;
        if (content) {
            if (contentType === 'string') {
                normalizeContent(toBeAdded, parse(content).program.body, matches);

            } else if (contentType === 'function') {
                let returnValue = [content(matches)];
                normalizeContent(toBeAdded, returnValue, matches);

            } else if (content.length) {
                normalizeContent(toBeAdded, content, matches);

            } else if (typeof content.type === 'string') {
                toBeAdded.push(content);
            }
        }
    });
}

function insertAsSibling (matches, toBeAdded, before) {
    each(matches, function (match) {
        if (match._) {
            if (Array.isArray(match._._containerParent)) {
                let newContents = [];
                each(match._._containerParent, function (node, index) {
                    if (!before) {
                        newContents.push(node);
                    }
                    if (node === match) {
                        each(toBeAdded, function (content) {
                            newContents.push(content);
                        });
                    }
                    if (before) {
                        newContents.push(node);
                    }
                });
                match._._nodeParent[match._._nodeKey] = newContents;
            } else {
                throw new Error('Sibling nodes can only be inserted into an Array: "' + match.type + '" is not an Array');
            }
        }
    });
}

function insertInside (matches, toBeAdded, before) {
    each(matches, function (match) {
        if (match.body) {
            let bodyArray = childNodes.get(match);
            if (before) {
                each(toBeAdded, function (content) {
                    bodyArray.unshift(content);
                });
            } else {
                each(toBeAdded, function (content) {
                    bodyArray.push(content);
                });
            }
        }
    });
}

function sliceReplace (n, toBeAdded) {
    Array.prototype.splice.apply(n._._containerParent, [n._._containerKey, 1].concat(toBeAdded));
}

function insertReplace (matches, toBeAdded) {
    each(matches, function (match) {
        if (match._) {
            let n = match;
            while (n) {
                if (n._) {
                    let nKey = n._._nodeKey;
                    let cParent = n._._containerParent;
                    if (nKey === 'body') {
                        if (n.type === 'ReturnStatement') {
                            let modToBeAdded = [];
                            each(toBeAdded, function (tba) {
                                if (tba.type === 'FunctionDeclaration') {
                                    try {
                                        modToBeAdded.push(tba.body.body[0]);
                                    } catch(e) {
                                        modToBeAdded.push(tba);
                                    }
                                } else if (tba.type === 'ExpressionStatement') {
                                    try {
                                        modToBeAdded.push(tba.expression.body.body[0]);
                                    } catch (e) {
                                        modToBeAdded.push(tba);
                                    }
                                } else {
                                    modToBeAdded.push(tba);
                                }
                            });
                            sliceReplace(n, modToBeAdded);
                        } else {
                            sliceReplace(n, toBeAdded);
                        }
                        break;

                    } else if (nKey === 'arguments') {
                        let modToBeAdded = [];
                        each(toBeAdded, function (tba) {
                            if (tba.type === 'ExpressionStatement') {
                                modToBeAdded.push(tba.expression);
                            } else {
                                modToBeAdded.push(tba);
                            }
                        });
                        sliceReplace(n, modToBeAdded);
                        break;

                    } else if (nKey === 'program') {
                        n.body = toBeAdded;
                        break;

                    } else {
                        // match not found, traverse upwards and keep searching
                        n = n._._nodeParent;
                    }

                } else {
                    break;
                }
            }

        } else if (match.type === 'Program') {
            match.body = toBeAdded;
        }
    });
}

function insert (matches, arrayOfContents, before, insertMethod) {
    let flattenedContents = [].concat.apply([], arrayOfContents); // Flatten nested arrays
    let toBeAdded = [];
    normalizeContent(toBeAdded, flattenedContents, matches);
    insertMethod(matches, toBeAdded, before);
}

module.exports = {

    asSibling: function (matches, arrayOfContents, before) {
        insert(matches, arrayOfContents, before, insertAsSibling);
    },

    inside: function (matches, arrayOfContents, before) {
        insert(matches, arrayOfContents, before, insertInside);
    },

    replace: function (matches, contents) {
        insert(matches, [contents], null, insertReplace);
    }
};
