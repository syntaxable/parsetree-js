
let foo = 123,
    bar = 456;

function privateMethod() {
    return foo;
}

function publicMethod(one, two) {
    let foo = 456;

    function inner() {
        action();
        var x = foo;
    }

    return one + foo;
}

module.exports = {
    publicMethod,
};
