import color from "./demo/color";

export type Unary<P, R> = (param: P) => R;
export type Variadic<P, R> = (...params: P[]) => R;
export type EasingFunction = Unary<number, number>;

// easeIn, easeOut, easeInOut, easeOutIn
export type EasingFunctionSet = [
  EasingFunction,
  EasingFunction,
  EasingFunction,
  EasingFunction
];

// ease, easeIn, easeOut, easeInOut, easeOutIn, easeMiddle
export type EasingFunctionSetWithAliases = [
  EasingFunction,
  EasingFunction,
  EasingFunction,
  EasingFunction,
  EasingFunction,
  EasingFunction
];

export type EventuallyReturnsAnEasingFunction<T = unknown> =
  | ((p: T) => EventuallyReturnsAnEasingFunction<unknown> | EasingFunction)
  | EasingFunction;

// export type TakesNumber<R> = Unary<number, R>;
export type EasingFunctionDecorator = Unary<EasingFunction, EasingFunction>;
export type Combinator2 = Unary<
  EasingFunction,
  Unary<EasingFunction, EasingFunction>
>;
export type CombinatorMany = Unary<EasingFunction[], EasingFunction>;

export type ReturnsEasingFunction<P = unknown> = Unary<P, EasingFunction>;

export type Pallete = typeof color.light | typeof color.dark;
