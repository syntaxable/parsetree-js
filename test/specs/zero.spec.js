
const $AST = require('../../index.js');

describe('zero', (expect) => {
    const $ = new $AST();
    expect($().concat([1,2,3]).zero().length).toBe(0);
});
