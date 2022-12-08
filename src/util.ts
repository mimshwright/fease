import { times, max, identity, always } from "ramda";
import { EasingFunction, ReturnsEasingFunction } from "./types";

export const render = (steps: number) => (f: EasingFunction) =>
  times((n) => f(n / (max(2, steps) - 1)), max(2, steps));

export const I: EasingFunction = identity<number>;
export const K: ReturnsEasingFunction<number> = always<number>;
