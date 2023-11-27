import { EasingFunction } from "../types";

export const difference =
  (f: EasingFunction) =>
  (g: EasingFunction): EasingFunction =>
  (x) =>
    Math.abs(f(x) - g(x));
