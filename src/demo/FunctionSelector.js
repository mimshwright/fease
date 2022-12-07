"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var preset_1 = require("../preset");
var ramda_1 = require("ramda");
// examples
var exampleFunctions = {
    linear: preset_1.linear,
    cubic: preset_1.cubic,
    sinWave: preset_1.sinWave
};
var getFunctionName = function (func) {
    return (0, ramda_1.pipe)((0, ramda_1.filter)((0, ramda_1.equals)(func)), ramda_1.keys, ramda_1.head)(exampleFunctions);
};
var FunctionSelector = function (_a) {
    var _b = _a.parameter, _c = _b.label, label = _c === void 0 ? "Function" : _c, _d = _b.value, value = _d === void 0 ? preset_1.linear : _d, setter = _b.setter;
    return (<div className="FunctionSelector">
      <label>{label}</label>
      <material_1.RadioGroup value={getFunctionName(value)} onChange={function (_, val) { return setter(function () { return exampleFunctions[val]; }); }}>
        <material_1.FormControlLabel value="linear" control={<material_1.Radio />} label="Linear"/>
        <material_1.FormControlLabel value="cubic" control={<material_1.Radio />} label="Cubic"/>
        <material_1.FormControlLabel value="sinWave" control={<material_1.Radio />} label="Sine Wave"/>
      </material_1.RadioGroup>
    </div>);
};
exports["default"] = FunctionSelector;
