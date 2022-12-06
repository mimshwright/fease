export type EasingFunction = (x: number) => number;
export type Unary<P, R> = (param: P) => R;
export type Decorator<P, R> = (f: Unary<P, R>) => Unary<P, R>;
export type HOEF<T> = (arg: T) => EasingFunction;
