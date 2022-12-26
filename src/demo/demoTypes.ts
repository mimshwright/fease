// Only used for demo and documentation

import { EasingFunction, EventuallyReturnsAnEasingFunction } from "../types";

export type FunctionExamples = Record<string, EasingFunction>;
export type Parameter<T> = { label: string; defaultValue: T };
export type ParameterNumber = Parameter<number> & {
  min: number;
  max: number;
  step?: number;
};
export type ParameterFunction = Parameter<EasingFunction> & {
  includeInGraph?: boolean;
  options?: FunctionExamples;
};
export type ParameterNumberArray = Parameter<number[]> & {
  options: Record<string, number[]>;
};
type Parameters = (
  | ParameterNumber
  | ParameterNumberArray
  | ParameterFunction
)[];

export const isNumberParameter = (
  p: Parameter<unknown>
): p is ParameterNumber => typeof p.defaultValue === "number";
export const isNumberArrayParameter = (
  p: Parameter<unknown>
): p is ParameterNumberArray =>
  p.defaultValue instanceof Array && typeof p.defaultValue[0] === "number";

export type ExampleType = "hidden" | "text" | "graph";

export interface ExampleProps {
  f: EventuallyReturnsAnEasingFunction;
  title: string;
  code: string;
  description?: string;
  seeAlso?: string[];
  parameters?: Parameters;
  exampleType?: ExampleType;
  exampleText?: string;
}

export type DemoExample = Omit<ExampleProps, "f"> & {
  f: unknown;
};

// By using the KeyTypeGuard, the demo is forced to create an example for each
// function exported by the library.
export type DemoSection<KeyTypeGuard> = {
  title: string;
  description: string;
  examples: Record<keyof KeyTypeGuard, DemoExample>;
};
