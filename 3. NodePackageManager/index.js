const lodash = require('lodash');

const names = ['ajay', 'vijay', 'john', 'tom'];
const capitalize = lodash.map(names, lodash.capitalize);
console.log(capitalize);