const firstModule = require('./first-module');

console.log(firstModule.add(2, 3));

try {
    console.log('trying to divide by zero');
    let result = firstModule.divide(100, 10);
    console.log(result);
} catch (error) {
    console.log('error occurred', error.message);
}


// module wrapper
// {
//     function (exports, require, module, __filename, __dirname) {

//     }
// }