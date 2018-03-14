
const $AST = require('../../index.js');

describe('concat', (expect) => {
    const $ = new $AST();
    expect($().concat([1,2,3]).concat([4,5,6]).length).toBe(6);
});
