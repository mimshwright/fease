"use strict";
exports.__esModule = true;
require("./App.css");
var react_1 = require("react");
var decorator = require("../decorator");
var factory_1 = require("../factory");
var Example_1 = require("./Example");
var preset_1 = require("../preset");
var exampleData = [
    {
        title: "Preset",
        description: "tbd",
        examples: [
            { f: preset_1.linear, title: "Linear", description: "TBD" },
            { f: preset_1.sinWave, title: "Sine Wave", description: "TBD" },
        ]
    },
    {
        title: "Generator",
        description: "tbd",
        examples: [
            {
                f: factory_1.sine,
                title: "Sine",
                description: "Creates a sine wave funciton with frequency a number of in full oscillations between 0 and 1 input.",
                parameters: [{ label: "frequency", min: 0, max: 20, defaultValue: 1 }]
            },
        ]
    },
    {
        title: "Decorator",
        description: "tbd",
        examples: [
            {
                f: decorator.scaleY,
                title: "ScaleY",
                description: "TBD",
                parameters: [
                    { label: "scaleY", min: 0, max: 100, defaultValue: 2 },
                    { label: "Input Function", defaultValue: preset_1.cubic },
                ]
            },
            {
                f: decorator.scaleXY,
                title: "ScaleXY",
                description: "TBD",
                parameters: [
                    { label: "scaleY", min: 0.1, max: 3, defaultValue: 0.2 },
                    { label: "Input Function", defaultValue: preset_1.sinWave },
                ]
            },
        ]
    },
];
function App() {
    return (<div className="App">
      <h1>Fease</h1>
      <div>
        <a style={{ display: "block" }} href="https://github.com/mimshwright/fease">
          View On GitHub
        </a>
      </div>
      {exampleData.map(function (section) { return (<section key={section.title}>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
          {section.examples.map(function (props) { return (<Example_1["default"] key={props.title} {...props}/>); })}
        </section>); })}
    </div>);
}
exports["default"] = App;
