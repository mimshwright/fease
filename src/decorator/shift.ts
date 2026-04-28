import { curry } from "ramda";
import { EasingFunction } from "../types";

// TODO: shift and scale simultaneously

export const shiftX = curry(
  (offset: number, f: EasingFunction): EasingFunction =>
    (x: number) =>
      f(x - offset),
);

export const shiftY = curry(
  (offset: number, f: EasingFunction): EasingFunction =>
    (x: number) =>
      f(x) + offset,
);
