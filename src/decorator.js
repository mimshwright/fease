"use strict";
exports.__esModule = true;
exports.scaleXY = exports.scaleY = exports.scaleX = void 0;
var ramda_1 = require("ramda");
// I
// K
// scaleX = scaleDuration = 1/scaleFreq
// scaleY = scaleAmp
// scaleXY
// reflectX
// reflectY
// reflectXY
// mirror f + reflectX(f)
// easeOut
// easeInOut
// easeMiddle
// switchN
// switch2
// sequence
// repeat
// oscillate
// stepped
// discrete (array)
// clamp
// clamp01
// forceEnd1
// forceStart0
// abs
// deflect / constrain
// addN
// add2
// mergeN (add + scaleY)
// merge2
// mult
// transition
// transitionWeighted
// export const shiftX
// shiftY
// shiftXY
var scaleX = function (scale) {
    return function (f) {
        return function (x) {
            return f(x / scale);
        };
    };
};
exports.scaleX = scaleX;
var scaleY = function (scale) {
    return function (f) {
        return function (x) {
            return f(x) * scale;
        };
    };
};
exports.scaleY = scaleY;
var scaleXY = function (scale) {
    return (0, ramda_1.pipe)((0, exports.scaleY)(scale), (0, exports.scaleX)(scale));
};
exports.scaleXY = scaleXY;
// shiftXYscaleXY
