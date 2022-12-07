import { Stage } from "@inlet/react-pixi";
import { EasingGraphComponent } from "pixi-easing-graph";
import { call, map, prop, reduce } from "ramda";
import React, { SetStateAction, useState } from "react";
import { EasingFunction } from "../types";
import FunctionSelector from "./FunctionSelector";
import NumberParameter from "./NumberParameter";

import "./Example.css";

type ParametricEasingFunction = (
  p: number | EasingFunction
) => ParametricEasingFunction | EasingFunction;

type Parameter<T> = { label: string; defaultValue: T };
type ParameterNumber = Parameter<number> & { min: number; max: number };
type ParameterFunction = Parameter<EasingFunction>;
type Parameters = (ParameterNumber | ParameterFunction)[];
type Stateful<T> = { value: T; setter: React.Dispatch<SetStateAction<T>> };
export type StatefulParameterNumber = ParameterNumber & Stateful<number>;
export type StatefulParameterFunction = ParameterFunction &
  Stateful<EasingFunction>;

export interface ExampleProps {
  f: ParametricEasingFunction | EasingFunction;
  title: string;
  description?: string;
  parameters?: Parameters;
}

const isDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const isFunction = (param: unknown): boolean => typeof param === "function";

const applyParametersToFunction = (
  parameterValues: (number | EasingFunction)[],
  f: ParametricEasingFunction | EasingFunction
) =>
  reduce(
    (f, param) => {
      if (isFunction(param)) {
        return call(f as ParametricEasingFunction, param as EasingFunction);
      } else {
        return call(f as ParametricEasingFunction, param as number);
      }
    },
    f,
    parameterValues
  ) as EasingFunction;

const Example: React.FC<ExampleProps> = ({
  f,
  title,
  description = "",
  parameters = [],
}) => {
  const paramsWithState = map((param: Parameter<unknown>) => {
    const [value, setter] = useState(() => param.defaultValue);
    return { ...param, value, setter };
  })(parameters);

  // paramsWithState.map(({ label, value }) => console.log(label, value));

  const parameterValues = map(prop("value"))(paramsWithState) as (
    | number
    | EasingFunction
  )[];

  const g: EasingFunction = applyParametersToFunction(parameterValues, f);

  return (
    <div className="Example">
      <div className="description">
        <h2>{title}</h2>
        <p>{description}</p>
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
            f={g}
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
