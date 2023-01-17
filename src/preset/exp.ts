import { pipe } from "ramda";
import { easeInOut, easeMiddle, easeOut } from "./../decorator/ease";
import { EasingFunction as EF } from "../types";
import { exp } from "../factory";
import { I } from "../util/fpUtil";

type ExpoSet = [EF, EF, EF, EF];
type ExpoSetWithAliases = [EF, EF, EF, EF, EF, EF];
const makeAliases = (array: ExpoSet): ExpoSetWithAliases => [
  array[0],
  ...array,
  array[3],
];
const createExpoSet = pipe(
  exp,
  (f: EF) => [f, easeOut(f), easeInOut(f), easeMiddle(f)] as ExpoSet,
  makeAliases
);

// Exponentials
export const linear: EF = I;
export const [quad, quadIn, quadOut, quadInOut, quadOutIn, quadMiddle] =
  createExpoSet(2);
export const [cubic, cubicIn, cubicOut, cubicInOut, cubicOutIn, cubicMiddle] =
  createExpoSet(3);
export const [
  quartic,
  quarticIn,
  quarticOut,
  quarticInOut,
  quarticOutIn,
  quarticMiddle,
] = createExpoSet(4);
export const [
  quintic,
  quinticIn,
  quinticOut,
  quinticInOut,
  quinticOutIn,
  quinticMiddle,
] = createExpoSet(5);
export const [
  sextic,
  sexticIn,
  sexticOut,
  sexticInOut,
  sexticOutIn,
  sexticMiddle,
] = createExpoSet(6);
