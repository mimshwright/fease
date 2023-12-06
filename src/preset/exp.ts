import { pipe } from "ramda";
import {
  EasingFunction,
  EasingFunctionSet,
  EasingFunctionSetWithAliases,
} from "../types";
import { exp } from "../factory";
import { I } from "../util/fpUtil";
import { createEaseSet } from "../util";

const makeAliases = (array: EasingFunctionSet): EasingFunctionSetWithAliases =>
  [array[0], ...array, array[3]] as EasingFunctionSetWithAliases;

const createExpoSet = pipe(exp, createEaseSet, makeAliases);

// Exponentials
export const linear: EasingFunction = I;
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
