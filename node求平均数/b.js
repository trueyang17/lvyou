let A = require('./a.js');
console.log(A);
exports.avg = function (...arg) {
    return A.sum(...arg)/arg.length
}