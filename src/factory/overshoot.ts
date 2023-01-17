import { clamp, pipe } from "ramda";
import { scaleY, shiftY } from "../decorator";
import { cubicOut } from "./../preset/exp";
import { sinusoid } from "./wave";
import { transitionWithControl } from "../combinator/transition";

export const overshoot = pipe(
  clamp(0, 1),
  (mag) => sinusoid(mag * 0.25 + 0.25),
  shiftY(-0.5),
  scaleY(2),
  (f) => shiftY(1 - f(1))(f),
  transitionWithControl(cubicOut)(cubicOut)
);
