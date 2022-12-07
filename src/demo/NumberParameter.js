"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = require("react");
var NumberParameter = function (_a) {
    var _b = _a.parameter, label = _b.label, value = _b.value, setter = _b.setter, min = _b.min, max = _b.max;
    return (<>
      <label>{label}</label>
      <material_1.Slider value={value} onChange={function (_e, val) { return setter(val); }} max={max} min={min} step={0.01} valueLabelDisplay="on"/>
    </>);
};
exports["default"] = NumberParameter;
