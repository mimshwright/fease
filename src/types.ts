export type Unary<P, R> = (param: P) => R;
export type EasingFunction = Unary<number, number>;

export type EventuallyReturnsAnEasingFunction<T = unknown> =
  | ((p: T) => EventuallyReturnsAnEasingFunction<unknown> | EasingFunction)
  | EasingFunction;

// export type TakesNumber<R> = Unary<number, R>;
export type EasingFunctionDecorator = Unary<EasingFunction, EasingFunction>;
export type ReturnsEasingFunction<P = unknown> = Unary<P, EasingFunction>;

// Only used for demo and documentation

export type Parameter<T> = { label: string; defaultValue: T };
export type ParameterNumber = Parameter<number> & { min: number; max: number };
export type ParameterFunction = Parameter<EasingFunction> & {
  includeInGraph?: boolean;
};
type Parameters = (ParameterNumber | ParameterFunction)[];

export const isNumberParameter = (
  p: Parameter<unknown>
): p is ParameterNumber => typeof p.defaultValue === "number";

export interface ExampleProps {
  f: EventuallyReturnsAnEasingFunction;
  title: string;
  code: string;
  description?: string;
  parameters?: Parameters;
}

export type ExampleData = Omit<ExampleProps, "f"> & { f: unknown };
export type Section = {
  title: string;
  description: string;
  examples: ExampleData[];
};
export type ExamplesData = Section[];
