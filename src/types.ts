export type Unary<P, R> = (param: P) => R;
export type EasingFunction = Unary<number, number>;

export type EventuallyReturnsAnEasingFunction<T = unknown> =
  | ((p: T) => EventuallyReturnsAnEasingFunction<unknown> | EasingFunction)
  | EasingFunction;

export type TakesNumber<R> = Unary<number, R>;
export type EasingFunctionDecorator = Unary<EasingFunction, EasingFunction>;
export type ReturnsEasingFunction<P = unknown> = Unary<P, EasingFunction>;
