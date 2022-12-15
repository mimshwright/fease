import {
  map,
  pipe,
  addIndex,
  repeat as arrayOfCopies,
  ifElse,
  always,
  identity,
} from "ramda";
import { EasingFunction, Unary } from "../types";
import { scaleX, scaleY } from "./scale";
// import { scaleX } from "./scale";
import { shiftX, shiftY } from "./shift";

export const splitN = (fs: EasingFunction[]) => (x: number) =>
  fs[Math.min(fs.length - 1, Math.floor(x * fs.length))](x);
export const split = (f: EasingFunction) => (g: EasingFunction) =>
  splitN([f, g]);

const scaleAndShiftY = (i: number, length: number) =>
  pipe(scaleY(1 / length), shiftY(i / length));
const scaleAndShiftYIfSequenced = (
  isSequenced: boolean,
  i: number,
  length: number
) => ifElse(always(isSequenced), scaleAndShiftY(i, length), identity);

// since splitScale and sequence are so similar (but kind of complicated)
// we're reusing this structure to create both functions.
const splitScaleBase = (
  isSequenced: boolean
): Unary<EasingFunction[], EasingFunction> =>
  pipe(
    addIndex<EasingFunction>(map)((f, i, { length }) =>
      pipe(
        scaleX(1 / length),
        shiftX(i / length),
        scaleAndShiftYIfSequenced(isSequenced, i, length)
      )(f)
    ),
    splitN
  );
export const splitScale = splitScaleBase(false);
export const sequence = splitScaleBase(true);

export const repeat = (times: number) => (f: EasingFunction) =>
  splitScale(arrayOfCopies(f)(times));
export const repeatSequence = (times: number) => (f: EasingFunction) =>
  sequence(arrayOfCopies(f)(times));
