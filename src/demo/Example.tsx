import React, { useState, SetStateAction } from "react";
import FunctionSelector from "./FunctionSelector";
import NumberParameter from "./NumberParameter";
import NumberArrayParameter from "./NumberArrayParameter";
// import Graph from "./Graph";
import Highlight from "react-highlight";

import "highlight.js/styles/shades-of-purple.css";
import "./Example.css";

import { EasingFunctionOptions } from "pixi-easing-graph/dist/EasingGraph";
import { EasingFunction, EventuallyReturnsAnEasingFunction } from "../types";
import {
  ExampleProps,
  isNumberParameter,
  isNumberArrayParameter,
  Parameter,
  ParameterFunction,
  ParameterNumber,
  ParameterNumberArray,
  ThemeColors,
} from "./demoTypes";

import {
  assoc,
  call,
  filter,
  map,
  pipe,
  prop,
  propEq,
  reduce,
  __,
} from "ramda";

import Graph from "./Graph";
import { Button } from "@mui/material";

type Stateful<T> = { value: T; setter: React.Dispatch<SetStateAction<T>> };
export type StatefulParameterNumber = ParameterNumber & Stateful<number>;
export type StatefulParameterNumberArray = ParameterNumberArray &
  Stateful<number[]>;
export type StatefulParameterFunction = ParameterFunction &
  Stateful<EasingFunction>;
type StatefulParameters = (
  | StatefulParameterNumber
  | StatefulParameterNumberArray
  | StatefulParameterFunction
)[];

const isFunction = (param: unknown): boolean => typeof param === "function";

// Takes a list of parameters and uses `useState` to give them `value` and `setter`.
const assignStateToParams = map(
  (
    param: Parameter<unknown>
  ):
    | StatefulParameterNumber
    | StatefulParameterNumberArray
    | StatefulParameterFunction => {
    if (isNumberParameter(param)) {
      const [value, setter] = useState<number>(() => param.defaultValue);
      return { ...param, value, setter } as StatefulParameterNumber;
    } else if (isNumberArrayParameter(param)) {
      const [value, setter] = useState<number[]>(() => param.defaultValue);
      return { ...param, value, setter } as StatefulParameterNumberArray;
    }
    const [value, setter] = useState<EasingFunction>(
      () => param.defaultValue as EasingFunction
    );
    return { ...param, value, setter } as StatefulParameterFunction;
  }
);

// Creates an array of just the current values of the parameters
const extractValues = map(prop("value"));

// Using the list of parameters, `parameters, and the chain of Unary functions, `f`,
// applies the parameters to the function ultimately resulting in a fully-parameterized
// EasingFunction.
const applyParametersToFunction = (
  parameterValues: (number | number[] | EasingFunction)[],
  f: EventuallyReturnsAnEasingFunction
) =>
  reduce(
    (f: unknown, param: unknown) => {
      if (isFunction(param)) {
        return call(
          f as EventuallyReturnsAnEasingFunction<EasingFunction>,
          param as EasingFunction
        );
      } else {
        return call(
          f as EventuallyReturnsAnEasingFunction<number | number[]>,
          param as number | number[]
        );
      }
    },
    f,
    parameterValues
  ) as EasingFunction;

type Props = ExampleProps & { themeColors: ThemeColors } & {
  onNext: () => void;
  onPrev: () => void;
};

const Example: React.FC<Props> = (props) => {
  const {
    f,
    title,
    code,
    section,
    subsection,
    description = "",
    parameters = [],
    exampleType = "graph",
    exampleText = "",
    alias = "",
    themeColors,
    // isVisible = false,
    onNext,
    onPrev,
  } = props;

  const paramsWithState = assignStateToParams(parameters) as StatefulParameters;
  const parameterValues = extractValues(paramsWithState) as (
    | number
    | EasingFunction
  )[];
  const easingFunctionWithParametersApplied: EasingFunction =
    applyParametersToFunction(parameterValues, f);
  const additionalFunctionsToRender: EasingFunctionOptions[] = pipe(
    filter(propEq("includeInGraph", true)),
    map(prop("value")),
    map(assoc("f", __, { foreground: themeColors.secondFunction }))
  )(paramsWithState) as EasingFunctionOptions[];

  const link = `#${title}`;

  const fs = [
    easingFunctionWithParametersApplied,
    ...additionalFunctionsToRender,
  ];

  return (
    <div className="Example">
      {exampleType === "graph" && <Graph fs={fs} themeColors={themeColors} />}
      <div className="description">
        <h2 className="sections">
          {section} • {subsection} •
        </h2>
        <a id={link} />
        <div className="title">
          <h3>
            {title}{" "}
            <a href={link} style={{ fontSize: "10px" }}>
              ⚓️
            </a>
          </h3>
          <div className="nextPrev">
            <Button onClick={() => onPrev()}>« Prev</Button>
            {" | "}
            <Button onClick={() => onNext()}>Next »</Button>
          </div>
        </div>
        <p>{description}</p>
        <Highlight className="javascript">{code}</Highlight>
        {alias && (
          <p>
            Alias: <code>{alias}</code>
          </p>
        )}
        {exampleType === "text" && exampleText !== "" && (
          <Highlight className="javascript">{exampleText}</Highlight>
        )}
        {parameters.length > 0 && (
          <div className="params">
            {paramsWithState.map((param, i) => (
              <div key={i}>
                {typeof param.value === "number" ? (
                  <NumberParameter
                    parameter={param as StatefulParameterNumber}
                  />
                ) : param.value instanceof Array ? (
                  <NumberArrayParameter
                    parameter={param as StatefulParameterNumberArray}
                  />
                ) : (
                  <FunctionSelector
                    parameter={param as StatefulParameterFunction}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Example;
