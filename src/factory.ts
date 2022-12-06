import { Decorator, EasingFunction, HOEF } from "./types";
import { identity, always, pipe } from "ramda";

type HOEFN = HOEF<number>;
type EFDecorator = Decorator<number, number>;

export const I: EasingFunction = identity<number>;
export const K: HOEFN = always<number>;

export const exp: HOEFN = (exp) => (x) => x ** exp;

export const scaleX =
  (scale: number): EFDecorator =>
  (f: EasingFunction) =>
  (x: number) =>
    f(x / scale);
export const scaleY =
  (scale: number): EFDecorator =>
  (f: EasingFunction) =>
  (x: number) =>
    f(x) * scale;

export const scaleXY = (scale: number): EFDecorator =>
  pipe(scaleY(scale), scaleX(scale));

const _2PI = Math.PI * 2;
export const sine: HOEFN =
  (frequency = 1) =>
  (x: number) =>
    Math.sin(x * _2PI * frequency) / 2 + 0.5;
