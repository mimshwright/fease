import { mergeWithControl } from "./../combinator/add";
import { EasingFunctionDecorator } from "../types";
import { random, sinusoid } from "../factory";

export const wobblify =
  (frequency: number) =>
  (intensity: number): EasingFunctionDecorator =>
  (f) =>
    mergeWithControl(intensity)(f)(sinusoid(frequency));

export const jitter =
  (intensity: number): EasingFunctionDecorator =>
  (f) =>
    mergeWithControl(intensity)(f)(random());
