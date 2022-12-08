import React from "react";
import * as decorator from "../decorator";
import { sine } from "../factory";
import Example, { ExampleProps } from "./Example";
import { cubic, linear, sinWave } from "../preset";
import { EventuallyReturnsAnEasingFunction } from "../types";
import { Button } from "@mui/material";

import "./App.css";

type ExampleData = Omit<ExampleProps, "f"> & { f: unknown };

type Section = {
  title: string;
  description: string;
  examples: ExampleData[];
};
type ExamplesData = Section[];

const exampleData: ExamplesData = [
  {
    title: "Preset",
    description: "tbd",
    examples: [
      {
        f: linear,
        title: "Linear",
        code: "preset.linear()",
        description: "TBD",
      },
      {
        f: sinWave,
        title: "Sine Wave",
        code: "preset.sinWave()",
        description: "TBD",
      },
    ],
  },

  {
    title: "Generator",
    description: "tbd",
    examples: [
      {
        f: sine,
        title: "Sine",
        code: "generator.sine(freq)",
        description:
          "Creates a sine wave funciton with frequency a number of in full oscillations between 0 and 1 input.",
        parameters: [
          { label: "frequency", min: 0.01, max: 20, defaultValue: 1 },
        ],
      },
      // {
      //   f: cosine,
      //   title: "Cosine",
      //   description:
      //     "Creates a cosine wave funciton with frequency a number of in full oscillations between 0 and 1 input.",
      //   parameters: [{ label: "frequency", min: 0, max: 20, defaultValue: 1 }],
      // },
    ],
  },
  {
    title: "Decorator",
    description: "tbd",
    examples: [
      {
        f: decorator.scaleX,
        title: "ScaleX",
        code: "decorator.scaleX(s)(f)",
        description:
          "Multiplies the input value of the function resulting in results scaled on the X axis. Affects frequency of waveforms.",
        parameters: [
          { label: "scaleY", min: -1, max: 3, defaultValue: 2 },
          {
            label: "Input Function",
            defaultValue: cubic,
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
          { label: "scaleY", min: -1, max: 3, defaultValue: 2 },
          {
            label: "Input Function",
            defaultValue: cubic,
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
          { label: "scaleY", min: 0.1, max: 2, defaultValue: 0.2 },
          {
            label: "Input Function",
            defaultValue: sinWave,
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
      <h1>Fease</h1>
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
