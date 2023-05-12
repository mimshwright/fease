import React, { useState } from "react";
import exampleData from "./exampleData";
import Example from "./Example";
import * as pkg from "../../package.json";
import { EventuallyReturnsAnEasingFunction } from "../types";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";

import "./App.css";
import { DemoExample } from "./demoTypes";
import { collectBy, filter, head, prop } from "ramda";
import color from "./color";
import { isDarkMode } from "./demoUtil";
import FunctionNameSlug from "./FunctionNameSlug";

const filterOutHiddenExamples = filter(
  ({ exampleType = "graph" }: DemoExample) => exampleType !== "hidden"
);

const collectByProp = (propName: keyof DemoExample) => (list: DemoExample[]) =>
  collectBy(prop(propName) as (d: DemoExample) => PropertyKey, list);
const collectBySection = collectByProp("section");
const collectBySubsection = collectByProp("subsection");

const examples = filterOutHiddenExamples(Object.values(exampleData.examples));
const sections = Object.keys(exampleData.sections);
const alphaExamples = examples.sort((a, b) => a.title.localeCompare(b.title));
const examplesBySection = collectBySection(examples)
  .sort((a: DemoExample[], b: DemoExample[]) => {
    const aTitle = head(a)?.section ?? "";
    const bTitle = head(b)?.section ?? "";
    return sections.indexOf(aTitle) - sections.indexOf(bTitle);
  })
  .map(collectBySubsection);

type Props = {
  deepLink?: string;
};

const App: React.FC<Props> = ({ deepLink = "" }) => {
  const themeColors = isDarkMode() ? color.dark : color.light;

  const initialDemo =
    Object.values(exampleData.examples as Record<string, DemoExample>).filter(
      (example: DemoExample) => example.title === deepLink
    )[0] ?? exampleData.examples.bounce;

  const [currentDemo, setCurrentDemo] = useState<DemoExample>(initialDemo);
  const [sortBy, setSortBy] = useState<"section" | "alpha">("section");
  const library =
    sortBy === "section" ? examplesBySection.flat(3) : alphaExamples;

  const i = library.findIndex((demo) => demo.title === currentDemo.title);
  const next = library[i + 1] ?? library[0];
  const prev = library[i - 1] ?? library[library.length - 1];

  const goToNextDemo = () => {
    setCurrentDemo(next);
  };

  const gotToPrevDemo = () => {
    setCurrentDemo(prev);
  };

  const onCurrentDemoChanged = (demo: DemoExample) => {
    setCurrentDemo(demo);
  };

  return (
    <div className="App">
      <header>
        <h1>
          {pkg.name}
          <span className="version"> v{pkg.version}</span>
        </h1>
        <a
          className="github"
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
        <div className="libraryDescription">
          {/* <p>Library Description TBD.</p> */}
        </div>
      </header>

      <div className="example">
        <Example
          key={currentDemo.title}
          {...currentDemo}
          f={currentDemo.f as EventuallyReturnsAnEasingFunction}
          onNext={goToNextDemo}
          onPrev={gotToPrevDemo}
          themeColors={themeColors}
        />
      </div>
      <div className="library">
        <div className="sort">
          Sort by:{" "}
          <ToggleButtonGroup
            exclusive
            value={sortBy}
            onChange={(_e, value) => setSortBy(value)}
          >
            <ToggleButton value="section">Cat.</ToggleButton>
            <ToggleButton value="alpha">A-Z</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="functionList">
          {sortBy === "alpha" &&
            alphaExamples.map((props) => (
              <FunctionNameSlug
                key={props.title}
                example={props}
                onCurrentDemoChanged={onCurrentDemoChanged}
                selected={props.title === currentDemo.title}
              />
            ))}

          {sortBy === "section" &&
            examplesBySection.map((subSections) => {
              const firstSubSection = head(subSections) ?? [];
              const firstItem = head(firstSubSection);
              const section = exampleData.sections[firstItem?.section ?? ""];

              return (
                <div className="section" key={section.title}>
                  <div className="section-summary">
                    <h2>{section.title}</h2>
                    <p>{section.description}</p>
                  </div>
                  <div className="section-list">
                    {subSections.map((items) => {
                      const subcategory = head(items)?.subsection ?? "";

                      return (
                        <div
                          className="section"
                          key={`${section.title}-${subcategory}`}
                        >
                          <div className="section-summary">
                            <h3>{subcategory}</h3>
                          </div>
                          <div className="section-list">
                            {items.map((props) => (
                              <FunctionNameSlug
                                key={props.title}
                                example={props}
                                onCurrentDemoChanged={onCurrentDemoChanged}
                                selected={props.title === currentDemo.title}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="copyright">Copyright &copy; 2023 by Mims Wright</div>
    </div>
  );
};

export default App;
