import {
  min as _min,
  max as _max,
  pipe,
  o,
  modulo,
  __,
  subtract,
  ifElse,
  lte,
  add,
} from "ramda";
import { EasingFunctionDecorator, EasingFunction } from "../types";
import { exp } from "../factory/exponential";
import { constant } from "../factory/constant";
import { transitionWithControl } from "../combinator/transition";

export const min = (minValue: number) => o(_max(minValue));
export const max = (maxValue: number) => o(_min(maxValue));
export const clamp = (minValue: number) => (maxValue: number) =>
  pipe(min(minValue), max(maxValue)) as EasingFunctionDecorator;
export const clamp01 = clamp(0)(1);

export const forceStart0 = (f: EasingFunction) => (x: number) =>
  x <= 0 ? 0 : f(x);
export const forceEnd1 = (f: EasingFunction) => (x: number) =>
  x >= 1 ? 1 : f(x);
export const forceStart0AndEnd1 = pipe(forceStart0, forceEnd1);

export const abs = o(Math.abs);

const constrainUtil = (lo: number) => (hi: number) =>
  pipe(
    modulo(__, 2 * (hi - lo)),
    subtract(__, lo),
    Math.abs,
    ifElse(
      lte(hi - lo),
      (x: number) => hi - lo - (x % (hi - lo)),
      modulo(__, hi - lo),
    ),
    add(lo),
  );

export const constrain = (low: number) => (high: number) => {
  if (low < high) return o(constrainUtil(low)(high));
  throw new RangeError(
    `high value must be greater than low value and cannot be equal.`,
  );
};
export const constrain01 = constrain(0)(1);

export const forceSmoothEnd = (startPoint: number) => (f: EasingFunction) =>
  transitionWithControl(exp(startPoint * 20))(f)(constant(1));

// Maybe leave this out for now. Not sure it works that well and not sure when it would be used.
// export const forceSmoothStart = (startPoint: number) => (f: EasingFunction) =>
// transitionWithControl(exp(1 / (startPoint * 20)))(constant(0))(f);
