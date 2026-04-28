import { curry } from "ramda";
import { mergeWithControl } from "./../combinator/add";
import { EasingFunction } from "../types";
import { exp, random, sine } from "../factory";

// this is copied here because of dependency issues
const cubic = exp(3);

export const wobblify = curry(
  (frequency: number, intensity: number, f: EasingFunction): EasingFunction =>
    mergeWithControl(intensity)(f)(sine(frequency)),
);

export const jitter = curry(
  (intensity: number, f: EasingFunction): EasingFunction =>
    // TODO: replace with smooth random
    mergeWithControl(intensity)(f)(random()),
);

export const scoot = curry(
  (frequency: number, intensity: number, f: EasingFunction): EasingFunction =>
    (x) => {
      const startOfStep = Math.floor(x * frequency) / frequency;
      const stepPercent = (x - startOfStep) * frequency;
      const x2 = cubic(stepPercent) / frequency;
      return (1 - intensity) * f(x) + intensity * f(startOfStep + x2);
    },
);
