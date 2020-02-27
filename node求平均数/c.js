let B = require('./b.js');
function c(...arg) {
    return B.avg(...arg)
}
console.log( c(34,45,67,87,32,12,31));
