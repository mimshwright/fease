import { mergeWithControl } from "./../combinator/add";
import { EasingFunctionDecorator } from "../types";
import { random, sine } from "../factory";

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

// TODO: scoot? merge with repeatSequenced (cubic)
