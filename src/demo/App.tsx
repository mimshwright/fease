import React from "react";
import * as decorator from "../decorator";
import * as generator from "../factory";
import Example from "./Example";
import * as preset from "../preset";
import * as pkg from "../../package.json";
import { EventuallyReturnsAnEasingFunction, ExamplesData } from "../types";
import { Button } from "@mui/material";

import "./App.css";

const exampleData: ExamplesData = [
  {
    title: "Presets",
    description:
      "Commonly used easing functions that require no additional parameters. You'll find most of the well-known easing functions here.",
    examples: [
      {
        f: preset.linear,
        title: "Linear",
        code: "preset.linear()",
        description: "TBD",
      },
      {
        f: preset.quad,
        title: "Quadratic",
        code: "preset.quad()",
        description: "TBD",
      },
      {
        f: preset.cubic,
        title: "Cubic",
        code: "preset.cubic()",
        description: "TBD",
      },
      {
        f: preset.sinWave,
        title: "Sine Wave",
        code: "preset.sinWave()",
        description: "TBD",
      },
      {
        f: preset.cosWave,
        title: "Cosine Wave",
        code: "preset.cosWave()",
        description: "(cos is identical to sin but the phase is +25%)",
      },
    ],
  },

  {
    title: "Generators",
    description:
      "Generators are functions that create a new type of Easing Funciton. They may take 1 or more parameters.",
    examples: [
      {
        f: generator.exp,
        title: "Exponential function",
        code: "generator.exp(exponent)",
        description: "Creates an exponential function with a given exponent.",
        parameters: [{ label: "exponent", min: -2, max: 6, defaultValue: 3 }],
      },
      {
        f: generator.sine,
        title: "Sine",
        code: "generator.sine(freq)",
        description:
          "Creates a sine wave funciton with frequency a number of in full oscillations between 0 and 1 input.",
        parameters: [
          { label: "frequency", min: 0.01, max: 20, defaultValue: 1 },
        ],
      },
    ],
  },
  {
    title: "Decorators",
    description:
      "Decorators take an Easing Function, and often 1 or more additional parameters, as input and return a modified function.",
    examples: [
      {
        f: decorator.shiftX,
        title: "ShiftX",
        code: "decorator.shiftX(x)(f)",
        description:
          "Adds or subtracts from the input value of the function resulting in a shift on the X axis. Affects phase of waveforms.",
        parameters: [
          { label: "shift", min: -1, max: 1, defaultValue: 0.5 },
          {
            label: "Input Function",
            defaultValue: preset.cubic,
            includeInGraph: true,
          },
        ],
      },
      {
        f: decorator.shiftY,
        title: "ShiftY",
        code: "decorator.shiftY(y)(f)",
        description:
          "Adds or subtracts from the output value of the function resulting in a shift on the Y axis.",
        parameters: [
          { label: "shift", min: -1, max: 1, defaultValue: 0.5 },
          {
            label: "Input Function",
            defaultValue: preset.cubic,
            includeInGraph: true,
          },
        ],
      },
      {
        f: decorator.scaleX,
        title: "ScaleX",
        code: "decorator.scaleX(s)(f)",
        description:
          "Multiplies the input value of the function resulting in results scaled on the X axis. Affects frequency of waveforms.",
        parameters: [
          { label: "scale", min: -1, max: 3, defaultValue: 2 },
          {
            label: "Input Function",
            defaultValue: preset.cubic,
            includeInGraph: true,
          },
        ],
      },
      {
        f: decorator.scaleY,
        title: "ScaleY",
        code: "decorator.scaleY(s)(f)",
        description:
          "Multiplies the output values of the function resulting in results scaled on the Y axis.  Affects amplitude of waveforms.",
        parameters: [
          { label: "scale", min: -1, max: 3, defaultValue: 2 },
          {
            label: "Input Function",
            defaultValue: preset.cubic,
            includeInGraph: true,
          },
        ],
      },
      {
        f: decorator.scaleXY,
        title: "ScaleXY",
        code: "decorator.scaleXY(s)(f)",
        description:
          "Scales in the X and Y direction simultaneously. (Note: This is difficult to see on normal functions, but is more visible on a waveform.)",
        parameters: [
          { label: "scale", min: 0.1, max: 2, defaultValue: 0.2 },
          {
            label: "Input Function",
            defaultValue: preset.sinWave,
            includeInGraph: true,
          },
        ],
      },
    ],
  },
];

function App() {
  return (
    <div className="App">
      <h1>{pkg.name}</h1>
      <p>v{pkg.version}</p>
      <div>
        <p>
          <b>Note: this project is in 🚧early pre-alpha!🚧</b>
        </p>
        <a
          style={{ display: "block" }}
          href="https://github.com/mimshwright/fease"
        >
          <Button variant="contained">View On GitHub</Button>
        </a>
      </div>
      {exampleData.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          {section.examples.map((props) => (
            <Example
              key={props.title}
              {...props}
              f={props.f as EventuallyReturnsAnEasingFunction}
            />
          ))}
        </section>
      ))}
    </div>
  );
}

export default App;
