import { curry } from "ramda";
import { EasingFunction } from "../types";

export const difference = curry(
  (f: EasingFunction, g: EasingFunction): EasingFunction =>
    (x) =>
      Math.abs(f(x) - g(x)),
);
