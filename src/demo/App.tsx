import React from "react";
import * as decorator from "../decorator";
import * as generator from "../factory";
import Example from "./Example";
import * as preset from "../preset";
import * as pkg from "../../package.json";
import { EventuallyReturnsAnEasingFunction, DemoContent } from "../types";
import { Button } from "@mui/material";

import "./App.css";

const exampleData: DemoContent = [
  preset.section,
  generator.section,
  decorator.section,
];

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
            {section.examples.map((props) => (
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
