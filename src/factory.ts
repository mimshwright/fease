import { ReturnsEasingFunction } from "./types";
import { addIndex, reduce } from "ramda";

// linear
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

export const exp: ReturnsEasingFunction<number> = (exp) => (x) => x ** exp;

export const poly: ReturnsEasingFunction<number[]> = (coefficients) => (x) =>
  addIndex(reduce<number, number>)(
    (total, coefficient, exponent) => total + coefficient * x ** exponent,
    0
  )(coefficients);

const FULL_ROTATION_IN_RADIANS = Math.PI * 2;
export const sine: ReturnsEasingFunction<number> =
  (frequency = 1) =>
  (x: number) =>
    Math.sin(x * frequency * FULL_ROTATION_IN_RADIANS) / 2 + 0.5;

// export const cosine: ReturnsEasingFunction<number> = shiftX(-0.25)(sine);
