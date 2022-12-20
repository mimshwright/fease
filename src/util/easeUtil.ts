import {
  times,
  max,
  modulo,
  __,
  pipe,
  ifElse,
  lte,
  subtract,
  add,
} from "ramda";
import { EasingFunction } from "../types";

export const render = (steps: number) => (f: EasingFunction) =>
  times((n) => f(n / (max(2, steps) - 1)), max(2, steps));

export const constrain = (lo: number) => (hi: number) =>
  pipe(
    modulo(__, 2 * (hi - lo)),
    subtract(__, lo),
    Math.abs,
    ifElse(
      lte(hi - lo),
      (x: number) => hi - lo - (x % (hi - lo)),
      modulo(__, hi - lo)
    ),
    add(lo)
  );
