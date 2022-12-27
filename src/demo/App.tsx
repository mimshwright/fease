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
import { collectBy, filter, head, prop } from "ramda";
import color from "./color";
import { isDarkMode } from "./demoUtil";

const filterOutHiddenExamples = filter(
  ({ exampleType = "graph" }: DemoExample) => exampleType !== "hidden"
);
const examples = Object.values(exampleData.examples);
const collectBySection = (list: DemoExample[]) =>
  collectBy(prop("section"), list);
const collectBySubsection = (list: DemoExample[]) =>
  collectBy(prop("subsection"), list);
const examplesBySection = collectBySection(filterOutHiddenExamples(examples));

function App() {
  const [expanded, setExpanded] = useState<string>("");
  const [expandedSub, setExpandedSub] = useState<string>("");

  const pallete = isDarkMode() ? color.dark : color.light;

  const onAccordionExpand =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : "");
    };
  const onAccordionExpandSub =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedSub(isExpanded ? panel : "");
    };

  const Arrow = () => (
    <ArrowForwardIosSharpIcon
      sx={{
        fontSize: "0.9rem",
        transform: "rotate(90deg)",
        fill: `#${pallete.foreground.toString(16)}`,
      }}
    />
  );

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

        {examplesBySection.map((examplesForSection) => {
          const first = head(examplesForSection);
          const section = exampleData.sections[first?.section ?? ""];
          const bySubcat = collectBySubsection(examplesForSection);

          return (
            <Accordion
              className="section"
              key={section.title}
              expanded={expanded === section.title}
              onChange={onAccordionExpand(section.title)}
            >
              <AccordionSummary
                className="section-summary"
                expandIcon={Arrow()}
              >
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </AccordionSummary>
              <AccordionDetails>
                {bySubcat.map((sub) => {
                  const subcategory = head(sub)?.subsection ?? "";

                  return (
                    <Accordion
                      key={`${section}-${sub}`}
                      className="section"
                      expanded={expandedSub === subcategory}
                      onChange={onAccordionExpandSub(subcategory)}
                    >
                      <AccordionSummary
                        className="section-summary"
                        expandIcon={Arrow()}
                      >
                        <h4>{subcategory}</h4>
                      </AccordionSummary>
                      <AccordionDetails>
                        {sub.map((props) => (
                          <Example
                            key={props.title}
                            {...props}
                            f={props.f as EventuallyReturnsAnEasingFunction}
                          />
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </main>
    </div>
  );
}

export default App;
