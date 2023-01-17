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

interface Props {
  category?: string;
  subcategory?: string;
}

function App({ category = "", subcategory = "" }: Props) {
  const pallete = isDarkMode() ? color.dark : color.light;

  const [expanded, setExpanded] = useState<string>(category);
  const [expandedSub, setExpandedSub] = useState<string>(subcategory);

  const setHistory = (cat: string, subcat: string) =>
    window.history.pushState({ cat, subcat }, "", `/${cat}/${subcat}`);

  const onAccordionExpand =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : "");
      setExpandedSub("");
      setHistory(panel, "");
    };
  const onAccordionExpandSub =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedSub(isExpanded ? panel : "");
      setHistory(expanded, panel);
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
          <p>Note: this project is in 🚧early alpha!🚧</p>
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
                      key={`${section.title}-${subcategory}`}
                      className="section"
                      expanded={expandedSub === subcategory}
                      onChange={onAccordionExpandSub(subcategory)}
                    >
                      <AccordionSummary
                        className="section-summary"
                        expandIcon={Arrow()}
                      >
                        <h3>{subcategory}</h3>
                      </AccordionSummary>
                      <AccordionDetails>
                        {sub.map((props) => (
                          <Example
                            key={props.title}
                            {...props}
                            isVisible={expandedSub === subcategory}
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
