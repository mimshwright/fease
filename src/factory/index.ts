import { EasingFunction, ReturnsEasingFunction } from "./../types";
import { wavify } from "../decorator/wavify";
import { addIndex, applyTo, pipe, reduce } from "ramda";
import { I } from "../util";

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

export const threshold =
  (thresholdPoint = 0.5) =>
  (x: number) =>
    x < thresholdPoint ? 0 : 1;

export const sinusoid: ReturnsEasingFunction<number> =
  (frequency = 1) =>
  (x: number) =>
    Math.sin(x * frequency * FULL_ROTATION_IN_RADIANS) / 2 + 0.5;

const wavifyFunction = (f: EasingFunction) => pipe(wavify, applyTo(f));

export const sawtooth: ReturnsEasingFunction<number> = wavifyFunction(I);
export const pulse = (offset: number) => wavifyFunction(threshold(offset));
export const square = pulse(0.5);
