import { mergeWithControl } from "./../combinator/add";
import { EasingFunctionDecorator } from "../types";
import { exp, random, sine } from "../factory";

// this is copied here because of dependency issues
const cubic = exp(3);

export const wobblify =
  (frequency: number) =>
  (intensity: number): EasingFunctionDecorator =>
  (f) =>
    mergeWithControl(intensity)(f)(sine(frequency));

export const jitter =
  (intensity: number): EasingFunctionDecorator =>
  (f) =>
    // TODO: replace with smooth random
    mergeWithControl(intensity)(f)(random());

export const scoot =
  (frequency: number) =>
  (intensity: number): EasingFunctionDecorator =>
  (f) =>
  (x) => {
    const startOfStep = Math.floor(x * frequency) / frequency;
    const stepPercent = (x - startOfStep) * frequency;
    const x2 = cubic(stepPercent) / frequency;
    return (1 - intensity) * f(x) + intensity * f(startOfStep + x2);
  };
