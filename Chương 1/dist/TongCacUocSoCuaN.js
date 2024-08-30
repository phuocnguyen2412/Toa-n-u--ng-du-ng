"use strict";
exports.__esModule = true;
var primeFactor_1 = require("./primeFactor");
var TongCacUocSoCuaN = function (n) {
    var factors = primeFactor_1["default"](n);
    console.log(factors);
    var tong = 0;
    for (var factor in factors) {
        tong += +factor;
    }
    return tong + 1;
};
console.log(TongCacUocSoCuaN(6));
exports["default"] = TongCacUocSoCuaN;
