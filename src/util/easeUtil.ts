import { times, max } from "ramda";
import { easeInOut, easeMiddle, easeOut } from "../decorator";
import { EasingFunction, EasingFunctionSet } from "../types";

export const render = (steps: number) => (f: EasingFunction) =>
  times((n) => f(n / (max(2, steps) - 1)), max(2, steps));

export const createEaseSet = (easeIn: EasingFunction, useEaseOut = false) =>
  (useEaseOut
    ? ([
        easeOut(easeIn),
        easeIn,
        easeMiddle(easeIn),
        easeInOut(easeIn),
      ] as EasingFunctionSet)
    : [
        easeIn,
        easeOut(easeIn),
        easeInOut(easeIn),
        easeMiddle(easeIn),
      ]) as EasingFunctionSet;
