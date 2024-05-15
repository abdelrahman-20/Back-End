console.log(arguments);
console.log(require("module").wrapper);

// ------------------------------------------------------------
// module.exports:
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(10, 20));

// ------------------------------------------------------------
// exports:
const calc2 = require("./test-module-2");
const { add, multiply, divide } = require("./test-module-2");

console.log(calc2.add(10, 20));
console.log(calc2.multiply(10, 20));

console.log(add(10, 15));
console.log(multiply(10, 15));
console.log(divide(10, 15));

// ------------------------------------------------------------
// Caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();

// ------------------------------------------------------------
