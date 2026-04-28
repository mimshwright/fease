import { curry, times, max, ap, flatten } from "ramda";
import { easeInOut, easeMiddle, easeOut } from "../decorator/ease";
import {
  EasingFunction,
  EasingFunctionList,
  EasingFunctionSet,
} from "../types";

export const render = curry((steps: number, f: EasingFunction): number[] =>
  times((n) => f(n / (max(2, steps) - 1)), max(2, steps)),
);

export const createEaseSet = (
  easeIn: EasingFunction,
  useEaseOut = false,
): EasingFunctionSet =>
  useEaseOut
    ? ([
        easeOut(easeIn),
        easeIn,
        easeMiddle(easeIn),
        easeInOut(easeIn),
      ] as EasingFunctionSet)
    : [easeIn, easeOut(easeIn), easeInOut(easeIn), easeMiddle(easeIn)];

export const multiEase =
  (easingFunctionOrFunctions: EasingFunction | EasingFunctionList) =>
  (xOrXs: number | readonly number[]): number[] =>
    ap(flatten([easingFunctionOrFunctions]))(flatten([xOrXs]));

export const lerp = curry(
  (start: number, end: number, percent: number): number =>
    start + percent * (end - start),
);

export const easingLerp = curry(
  (f: EasingFunction, start: number, end: number, percent: number): number =>
    lerp(start)(end)(f(percent)),
);

// export const ease =
//   (easingFunction: EasingFunction) =>
//   (duration: number) =>
//   (startTime: number) =>
//   (startValue: number) =>
//   (endValue: number) =>
//   (currentTime: number) =>
//     easingLerp(easingFunction)(startValue)(endValue)(
//       (currentTime - startTime) / duration
//     );
