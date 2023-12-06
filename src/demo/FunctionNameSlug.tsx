import React from "react";
import { DemoExample } from "./demoTypes";
import "./FunctionNameSlug.css";

const FunctionNameSlug: React.FC<{
  // eslint-disable-next-line functional/no-return-void
  onCurrentDemoChanged: <T extends Readonly<DemoExample>>(demo: T) => void;
  example: DemoExample;
  selected?: boolean;
}> = ({ onCurrentDemoChanged, example, selected = false }) => (
  <h4>
    <a
      href={`#${example.title}`}
      key={example.title}
      className={`FunctionNameSlug ${selected ? "selected" : ""}`}
      // eslint-disable-next-line functional/functional-parameters, functional/no-return-void
      onClick={() => onCurrentDemoChanged(example)}
      // onMouseOver={() => onCurrentDemoChanged(example)}
    >
      {example.title}
    </a>
  </h4>
);
export default FunctionNameSlug;
