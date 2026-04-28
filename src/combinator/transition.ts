import { Combinator2, EasingFunction } from "./../types";
import { clamp, curry } from "ramda";
import { I } from "../util";

export const transitionWithControl = curry(
  (
    controlFunction: EasingFunction,
    f: EasingFunction,
    g: EasingFunction,
  ): EasingFunction =>
    (x) =>
      (1 - clamp(0, 1, controlFunction(x))) * f(x) +
      clamp(0, 1, controlFunction(x)) * g(x),
);

export const transition: Combinator2 = transitionWithControl(I);
