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
type Parameters = (ParameterNumber | ParameterFunction)[];

export const isNumberParameter = (
  p: Parameter<unknown>
): p is ParameterNumber => typeof p.defaultValue === "number";

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
