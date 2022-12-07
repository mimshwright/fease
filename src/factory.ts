import { EasingFunction, HOEF } from "./types";
import { identity, always, addIndex, reduce } from "ramda";

type HOEFN = HOEF<number>;

// linear
// exponent
// polynomial
// constant
// threshhold
// sin
// cos
// tan
// triangle
// sawtooth
// square
// pulse
// random
// circle
// physics?

export const I: EasingFunction = identity<number>;
export const K: HOEFN = always<number>;

export const exp: HOEFN = (exp) => (x) => x ** exp;

export const poly =
  (coefficients: number[]) =>
  (x: number): number =>
    addIndex(reduce<number, number>)(
      (total, coefficient, exponent) => total + coefficient * x ** exponent,
      0
    )(coefficients);

const _2PI = Math.PI * 2;
export const sine: HOEFN =
  (frequency = 1) =>
  (x: number) =>
    Math.sin(x * _2PI * frequency) / 2 + 0.5;
