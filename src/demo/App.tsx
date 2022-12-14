import React from "react";
import exampleData from "./exampleData";
import Example from "./Example";
import * as pkg from "../../package.json";
import { EventuallyReturnsAnEasingFunction } from "../types";
import { Button } from "@mui/material";

import "./App.css";
import { DemoExample } from "./demoTypes";
import { filter } from "ramda";

const filterOutHiddenExamples = filter(
  ({ exampleType = "graph" }: DemoExample) => exampleType !== "hidden"
);
const getExamples = <T extends { examples: Record<string, DemoExample> }>(
  section: T
) => Object.values(section.examples) as DemoExample[];

function App() {
  return (
    <div className="App">
      <header>
        <h1>
          {pkg.name}
          <span className="version"> v{pkg.version}</span>
        </h1>

        <a
          style={{ display: "block" }}
          href="https://github.com/mimshwright/fease"
        >
          <Button variant="outlined">View On GitHub</Button>
        </a>
      </header>

      <main>
        <div>
          <p className="libraryDescription">Library Description TBD.</p>
          <p>Note: this project is in 🚧early pre-alpha!🚧</p>
        </div>

        {exampleData.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            {filterOutHiddenExamples(getExamples(section)).map((props) => (
              <Example
                key={props.title}
                {...props}
                f={props.f as EventuallyReturnsAnEasingFunction}
              />
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
