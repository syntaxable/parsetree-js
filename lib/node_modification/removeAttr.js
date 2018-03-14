
function removeAttr (name) {
    if (typeof name !== 'string' || !this[0]) {
        return;
    }

    let nameComponents = name.split('.');
    let lastComponent = nameComponents.pop();

    this.each(function (node) {
        let prop = node;
        nameComponents.forEach(function (nameComponent) {
            if (typeof prop[nameComponent] !== 'undefined') {
                prop = prop[nameComponent];
            }
        });
        delete prop[lastComponent];
    });

    return this;
}

module.exports = removeAttr;
