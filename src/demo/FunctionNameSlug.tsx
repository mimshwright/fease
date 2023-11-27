import React from "react";
import { DemoExample } from "./demoTypes";
import "./FunctionNameSlug.css";

const FunctionNameSlug: React.FC<{
  onCurrentDemoChanged: (demo: DemoExample) => void;
  example: DemoExample;
  selected?: boolean;
}> = ({ onCurrentDemoChanged, example, selected = false }) => (
  <h4>
    <a
      href={`#${example.title}`}
      key={example.title}
      className={`FunctionNameSlug ${selected ? "selected" : ""}`}
      onClick={() => onCurrentDemoChanged(example)}
      // onMouseOver={() => onCurrentDemoChanged(example)}
    >
      {example.title}
    </a>
  </h4>
);
export default FunctionNameSlug;
