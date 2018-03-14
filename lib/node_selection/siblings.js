
function siblings (selector) {
    let currentMatches = [];

    this.each(function (match) {
        currentMatches.push(match);
    });

    return this.parent().children(selector).filter(function (node) {
        if (currentMatches.indexOf(node) === -1) {
            return true;
        }
    });
}

module.exports = siblings;
