import "./App.css";
import React from "react";
import * as decorator from "../decorator";
import { sine } from "../factory";
import Example, { ExampleProps } from "./Example";
import { cubic, linear, sinWave } from "../preset";

type ExampleData = ExampleProps;

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
      { f: linear, title: "Linear", description: "TBD" },
      { f: sinWave, title: "Sine Wave", description: "TBD" },
    ],
  },

  {
    title: "Generator",
    description: "tbd",
    examples: [
      {
        f: sine,
        title: "Sine",
        description:
          "Creates a sine wave funciton with frequency a number of in full oscillations between 0 and 1 input.",
        parameters: [{ label: "frequency", min: 0, max: 20, defaultValue: 1 }],
      },
    ],
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
          { label: "Input Function", defaultValue: cubic },
        ],
      },
      {
        f: decorator.scaleXY,
        title: "ScaleXY",
        description: "TBD",
        parameters: [
          { label: "scaleY", min: 0.1, max: 3, defaultValue: 0.2 },
          { label: "Input Function", defaultValue: sinWave },
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
        <a
          style={{ display: "block" }}
          href="https://github.com/mimshwright/fease"
        >
          View On GitHub
        </a>
      </div>
      {exampleData.map((section) => (
        <section key={section.title}>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
          {section.examples.map((props) => (
            <Example key={props.title} {...props} />
          ))}
        </section>
      ))}
    </div>
  );
}

export default App;
