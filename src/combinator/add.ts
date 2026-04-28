import { scaleY } from "./../decorator/scale";
import { clamp, curry, reduce } from "ramda";
import { Combinator2, CombinatorMany, EasingFunction } from "./../types";

const reduceFunctions = (x: number) =>
  reduce((sum: number, f: EasingFunction) => f(x) + sum, 0);

export const addN: CombinatorMany = (fs) => (x: number) =>
  reduceFunctions(x)(fs);
export const add: Combinator2 = curry(
  (f: EasingFunction, g: EasingFunction): EasingFunction => addN([f, g]),
);

export const mergeN: CombinatorMany = (fs) => scaleY(1 / fs.length)(addN(fs));
export const merge: Combinator2 = curry(
  (f: EasingFunction, g: EasingFunction): EasingFunction => mergeN([f, g]),
);

export const mergeWithControl = curry(
  (control: number, f: EasingFunction, g: EasingFunction): EasingFunction =>
    (x: number) =>
      (1 - clamp(0, 1, control)) * f(x) + clamp(0, 1, control) * g(x),
);
