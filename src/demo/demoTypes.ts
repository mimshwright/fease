import { EasingFunctionOptions } from "pixi-easing-graph/dist/EasingGraph";
// Only used for demo and documentation

import { EasingFunction, EventuallyReturnsAnEasingFunction } from "../types";
import color from "./color";

export type GraphFunctions = (EasingFunction | EasingFunctionOptions)[];
export type FunctionExamples = Record<string, EasingFunction>;
export type Parameter<T> = { label: string; defaultValue: T };
export type ParameterNumber = Parameter<number> & {
  min: number;
  max: number;
  step?: number;
};
export type ParameterFunction = Parameter<EasingFunction> & {
  includeInGraph: boolean;
  options?: FunctionExamples;
};
export type ParameterNumberArray = Parameter<number[]> & {
  options: Record<string, number[]>;
};
export type ParameterBoolean = Parameter<boolean>;

type Parameters = (
  | ParameterNumber
  | ParameterNumberArray
  | ParameterFunction
  | ParameterBoolean
)[];

export const isNumberParameter = (
  p: Parameter<unknown>,
): p is ParameterNumber => typeof p.defaultValue === "number";
export const isNumberArrayParameter = (
  p: Parameter<unknown>,
): p is ParameterNumberArray =>
  p.defaultValue instanceof Array && typeof p.defaultValue[0] === "number";
export const isBooleanParameter = (
  p: Parameter<unknown>,
): p is ParameterBoolean => typeof p.defaultValue === "boolean";

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
  alias?: string;
  isVisible?: boolean;
  section: string;
  subsection: string;
}

export type DemoExample = Omit<ExampleProps, "f"> & {
  f: unknown;
};

// By using the KeyTypeGuard, the demo is forced to create an example for each
// function exported by the library.
export type DemoSection = {
  title: string;
  description: string;
};

export type DemoCollection<LibraryTypeGuard> = {
  sections: Record<string, DemoSection>;
  examples: Record<keyof LibraryTypeGuard, DemoExample>;
};

export type ThemeColors = typeof color.light | typeof color.dark;
