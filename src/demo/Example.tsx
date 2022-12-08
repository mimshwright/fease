import { Stage } from "@inlet/react-pixi";
import { EasingGraphComponent } from "pixi-easing-graph";
import { call, map, prop, reduce } from "ramda";
import React, { SetStateAction, useState } from "react";
import { EasingFunction, EventuallyReturnsAnEasingFunction } from "../types";
import FunctionSelector from "./FunctionSelector";
import NumberParameter from "./NumberParameter";
import * as util from "./util";

import "./Example.css";

type Parameter<T> = { label: string; defaultValue: T };
type ParameterNumber = Parameter<number> & { min: number; max: number };
type ParameterFunction = Parameter<EasingFunction> & {
  includeInGraph?: boolean;
};
type Parameters = (ParameterNumber | ParameterFunction)[];
type Stateful<T> = { value: T; setter: React.Dispatch<SetStateAction<T>> };
export type StatefulParameterNumber = ParameterNumber & Stateful<number>;
export type StatefulParameterFunction = ParameterFunction &
  Stateful<EasingFunction>;
type StatefulParameters = (
  | StatefulParameterNumber
  | StatefulParameterFunction
)[];

const isNumberParameter = (p: Parameter<unknown>): p is ParameterNumber =>
  typeof p.defaultValue === "number";

export interface ExampleProps {
  f: EventuallyReturnsAnEasingFunction;
  title: string;
  code: string;
  description?: string;
  parameters?: Parameters;
}

const isFunction = (param: unknown): boolean => typeof param === "function";

// Takes a list of parameters and uses `useState` to give them `value` and `setter`.
const assignStateToParams = map(
  (
    param: Parameter<unknown>
  ): StatefulParameterNumber | StatefulParameterFunction => {
    if (isNumberParameter(param)) {
      const [value, setter] = useState<number>(() => param.defaultValue);
      return { ...param, value, setter } as StatefulParameterNumber;
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
  parameterValues: (number | EasingFunction)[],
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
          f as EventuallyReturnsAnEasingFunction<number>,
          param as number
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
}) => {
  const isDarkMode = util.isDarkMode();
  const paramsWithState = assignStateToParams(parameters) as StatefulParameters;
  const parameterValues = extractValues(paramsWithState) as (
    | number
    | EasingFunction
  )[];
  const easingFunctionWithParametersApplied: EasingFunction =
    applyParametersToFunction(parameterValues, f);

  return (
    <div className="Example">
      <div className="description">
        <h3>{title}</h3>
        <p>{description}</p>
        <code>{code}</code>
        <div className="params">
          {paramsWithState.map((param, i) => (
            <div key={i}>
              {typeof param.value === "number" ? (
                <NumberParameter parameter={param as StatefulParameterNumber} />
              ) : (
                <FunctionSelector
                  parameter={param as StatefulParameterFunction}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="example">
        <Stage
          width={500}
          height={300}
          options={{
            resolution: 2,
            backgroundColor: isDarkMode ? 0x000000 : 0xffffff,
            backgroundAlpha: 0,
          }}
        >
          <EasingGraphComponent
            f={easingFunctionWithParametersApplied}
            width={200}
            height={200}
            x={50}
            y={50}
            autoPlay={true}
            loop={true}
            style="line"
            showExample={true}
            exampleSize={15}
            background={isDarkMode ? 0x333333 : 0xeeffff}
            foreground={isDarkMode ? 0x00ffff : 0x0000ff}
            fillAlpha={0.5}
            exampleColor={0xcc00ff}
            markerColor={0xff00ff}
            gridColor={isDarkMode ? 0x6600ff : 0x00ffff}
            gridSubdivisions={true}
          />
        </Stage>
      </div>
    </div>
  );
};

export default Example;
