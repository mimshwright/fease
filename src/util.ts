import { times, max } from "ramda";
import { EasingFunction } from "./types";

export const render = (steps: number) => (f: EasingFunction) =>
  times((n) => f(n / (max(2, steps) - 1)), max(2, steps));
