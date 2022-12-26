import React, { useState } from "react";
import exampleData from "./exampleData";
import Example from "./Example";
import * as pkg from "../../package.json";
import { EventuallyReturnsAnEasingFunction } from "../types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

import "./App.css";
import { DemoExample } from "./demoTypes";
import { filter } from "ramda";
import color from "./color";
import { isDarkMode } from "./demoUtil";

const filterOutHiddenExamples = filter(
  ({ exampleType = "graph" }: DemoExample) => exampleType !== "hidden"
);
const getExamples = <T extends { examples: Record<string, DemoExample> }>(
  section: T
) => Object.values(section.examples) as DemoExample[];

function App() {
  const [expanded, setExpanded] = useState<string>("");

  const pallete = isDarkMode() ? color.dark : color.light;

  const onAccordionExpand =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : "");
    };

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
          <Button
            variant="outlined"
            sx={{ fontFamily: "var(--font-headline)" }}
          >
            View On GitHub
          </Button>
        </a>
      </header>

      <main>
        <div>
          <p className="libraryDescription">Library Description TBD.</p>
          <p>Note: this project is in 🚧early pre-alpha!🚧</p>
        </div>

        {exampleData.map((section) => (
          <Accordion
            className="section"
            key={section.title}
            expanded={expanded === section.title}
            onChange={onAccordionExpand(section.title)}
            sx={{
              background: "transparent",
              boxShadow: "none",
              color: "inherit",
            }}
          >
            <AccordionSummary
              className="section-summary"
              expandIcon={
                <ArrowForwardIosSharpIcon
                  sx={{
                    fontSize: "0.9rem",
                    transform: "rotate(90deg)",
                    fill: `#${pallete.foreground.toString(16)}`,
                  }}
                />
              }
            >
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </AccordionSummary>
            <AccordionDetails>
              {filterOutHiddenExamples(getExamples(section)).map((props) => (
                <Example
                  key={props.title}
                  {...props}
                  f={props.f as EventuallyReturnsAnEasingFunction}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </main>
    </div>
  );
}

export default App;
