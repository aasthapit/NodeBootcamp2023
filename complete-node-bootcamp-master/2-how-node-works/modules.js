// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const C = require('./test-module1');
const calc1 = new C();
console.log(calc1.add(3, 5));

// exports
const { add, multiply, divide } = require('./test-module2');
console.log(multiply(3, 5));

// caching
require('./test-module3')();
require('./test-module3')();
require('./test-module3')();
