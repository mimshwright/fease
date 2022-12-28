import { ErrorBoundary } from "react-error-boundary";
// import VisibilitySensor from "react-visibility-sensor";
import { Stage } from "@inlet/react-pixi";
import { EasingGraphComponent } from "pixi-easing-graph";
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
import React, { useState, SetStateAction } from "react";
import { EasingFunction, EventuallyReturnsAnEasingFunction } from "../types";
import {
  ExampleProps,
  isNumberParameter,
  isNumberArrayParameter,
  Parameter,
  ParameterFunction,
  ParameterNumber,
  ParameterNumberArray,
} from "./demoTypes";
import FunctionSelector from "./FunctionSelector";
import NumberParameter from "./NumberParameter";
import NumberArrayParameter from "./NumberArrayParameter";
import { isDarkMode } from "./demoUtil";

import color from "./color";
import Highlight from "react-highlight";
import "highlight.js/styles/shades-of-purple.css";

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

import "./Example.css";
import { EasingFunctionOptions } from "pixi-easing-graph/dist/EasingGraph";

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

const Example: React.FC<ExampleProps> = ({
  f,
  title,
  code,
  description = "",
  parameters = [],
  exampleType = "graph",
  exampleText = "",
  isVisible = false,
}) => {
  // const [isVisible, setIsVisible] = useState(false);
  // const onVisibilityChange = (visible: boolean) => setIsVisible(visible);

  const pallete = isDarkMode() ? color.dark : color.light;
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
    map(assoc("f", __, { foreground: pallete.secondFunction }))
  )(paramsWithState) as EasingFunctionOptions[];

  const fs = [
    easingFunctionWithParametersApplied,
    ...additionalFunctionsToRender,
  ];

  return (
    // <VisibilitySensor
    //   onChange={onVisibilityChange}
    //   intervalCheck={true}
    //   intervalDelay={100}
    //   partialVisibility={true}
    // >
    <div className="Example">
      <div className="description">
        <h3>{title}</h3>
        <p>{description}</p>
        <code>{code}</code>
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

      {exampleType === "graph" && isVisible && (
        <div className="example">
          <ErrorBoundary
            FallbackComponent={() => (
              <div>
                An error occurred trying to render a graph of this function.
              </div>
            )}
          >
            <Stage
              width={400}
              height={400}
              options={{
                resolution: 2,
                backgroundAlpha: 0,
              }}
            >
              <EasingGraphComponent
                f={fs}
                width={300}
                height={300}
                x={50}
                y={50}
                autoPlay={true}
                loop={true}
                style="line"
                showExample={true}
                exampleSize={15}
                gridSubdivisions={true}
                fillAlpha={0.5}
                background={pallete.background}
                foreground={pallete.foreground}
                gridColor={pallete.gridColor}
                markerColor={pallete.markerColor}
                exampleColor={pallete.exampleColor}
              />
            </Stage>
          </ErrorBoundary>
        </div>
      )}
    </div>
    // </VisibilitySensor>
  );
};

export default Example;
