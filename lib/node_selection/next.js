
function next (selector) {
    let nextNodes = [];

    this.each(function (match) {
        let containerKey = match._._containerKey;
        let containerParent = match._._containerParent;
        let nextKey = containerKey + 1;
        if (nextKey < containerParent.length) {
            let nextNode = containerParent[nextKey];
            if (nextNode) {
                nextNodes.push(nextNode);
            }
        }
    });

    this.zero();
    return this.concat(nextNodes);
}

module.exports = next;
