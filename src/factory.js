"use strict";
exports.__esModule = true;
exports.sine = exports.poly = exports.exp = exports.K = exports.I = void 0;
var ramda_1 = require("ramda");
// linear
// exponent
// polynomial
// constant
// threshhold
// sin
// cos
// tan
// triangle
// sawtooth
// square
// pulse
// random
// circle
// physics?
exports.I = (ramda_1.identity);
exports.K = (ramda_1.always);
var exp = function (exp) { return function (x) { return Math.pow(x, exp); }; };
exports.exp = exp;
var poly = function (coefficients) {
    return function (x) {
        return (0, ramda_1.addIndex)((ramda_1.reduce))(function (total, coefficient, exponent) { return total + coefficient * Math.pow(x, exponent); }, 0)(coefficients);
    };
};
exports.poly = poly;
var _2PI = Math.PI * 2;
var sine = function (frequency) {
    if (frequency === void 0) { frequency = 1; }
    return function (x) {
        return Math.sin(x * _2PI * frequency) / 2 + 0.5;
    };
};
exports.sine = sine;
