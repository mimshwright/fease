import { ReturnsEasingFunction } from "../types";
import { addIndex, reduce } from "ramda";

const FULL_ROTATION_IN_RADIANS = Math.PI * 2;

// linear
// constant
// threshhold
// tan
// triangle
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

export const sinusoid: ReturnsEasingFunction<number> =
  (frequency = 1) =>
  (x: number) =>
    Math.sin(x * frequency * FULL_ROTATION_IN_RADIANS) / 2 + 0.5;

export const sawtooth: ReturnsEasingFunction<number> =
  (frequency = 1) =>
  (x: number) =>
    (x % (1 / frequency)) * frequency;
