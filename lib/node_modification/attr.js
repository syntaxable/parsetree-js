
function attr (name, value) {
    if (typeof name !== 'string' || !this[0]) {
        return;
    }

    let nameComponents = name.split('.');
    let lastComponent = nameComponents.pop();

    // setter
    if (typeof value !== 'undefined') {
        this.each(function (node) {
            let prop = node;
            nameComponents.forEach(function (nameComponent) {
                if (typeof prop[nameComponent] === 'undefined') {
                    prop[nameComponent] = {};
                }
                prop = prop[nameComponent] || prop;
            });
            prop[lastComponent] = value;
        });
        return this;
    }

    // getter
    let prop = this[0];
    nameComponents.forEach(function (nameComponent) {
        prop = prop[nameComponent] || prop;
    });

    return prop[lastComponent];
}

module.exports = attr;
