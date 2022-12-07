"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_pixi_1 = require("@inlet/react-pixi");
var pixi_easing_graph_1 = require("pixi-easing-graph");
var ramda_1 = require("ramda");
var react_1 = require("react");
var FunctionSelector_1 = require("./FunctionSelector");
var NumberParameter_1 = require("./NumberParameter");
require("./Example.css");
var isDarkMode = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
var isFunction = function (param) { return typeof param === "function"; };
var applyParametersToFunction = function (parameterValues, f) {
    return (0, ramda_1.reduce)(function (f, param) {
        if (isFunction(param)) {
            return (0, ramda_1.call)(f, param);
        }
        else {
            return (0, ramda_1.call)(f, param);
        }
    }, f, parameterValues);
};
var Example = function (_a) {
    var f = _a.f, title = _a.title, _b = _a.description, description = _b === void 0 ? "" : _b, _c = _a.parameters, parameters = _c === void 0 ? [] : _c;
    var paramsWithState = (0, ramda_1.map)(function (param) {
        var _a = (0, react_1.useState)(function () { return param.defaultValue; }), value = _a[0], setter = _a[1];
        return __assign(__assign({}, param), { value: value, setter: setter });
    })(parameters);
    // paramsWithState.map(({ label, value }) => console.log(label, value));
    var parameterValues = (0, ramda_1.map)((0, ramda_1.prop)("value"))(paramsWithState);
    var g = applyParametersToFunction(parameterValues, f);
    return (<div className="Example">
      <div className="description">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="params">
          {paramsWithState.map(function (param, i) { return (<div key={i}>
              {typeof param.value === "number" ? (<NumberParameter_1["default"] parameter={param}/>) : (<FunctionSelector_1["default"] parameter={param}/>)}
            </div>); })}
        </div>
      </div>
      <div className="example">
        <react_pixi_1.Stage width={500} height={300} options={{
            resolution: 2,
            backgroundColor: isDarkMode ? 0x000000 : 0xffffff,
            backgroundAlpha: 0
        }}>
          <pixi_easing_graph_1.EasingGraphComponent f={g} width={200} height={200} x={50} y={50} autoPlay={true} loop={true} style="line" showExample={true} exampleSize={15} background={isDarkMode ? 0x333333 : 0xeeffff} foreground={isDarkMode ? 0x00ffff : 0x0000ff} fillAlpha={0.5} exampleColor={0xcc00ff} markerColor={0xff00ff} gridColor={isDarkMode ? 0x6600ff : 0x00ffff} gridSubdivisions={true}/>
        </react_pixi_1.Stage>
      </div>
    </div>);
};
exports["default"] = Example;
