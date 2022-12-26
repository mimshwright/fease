import {
  map,
  pipe,
  addIndex,
  repeat as arrayOfCopies,
  identity,
  min,
  nth,
  __,
} from "ramda";
import { EasingFunction, Unary } from "../types";
import { scaleX, scaleY } from "./scale";
// import { scaleX } from "./scale";
import { shiftX, shiftY } from "./shift";

export const splitN = (fs: EasingFunction[]) => (x: number) =>
  pipe(
    (x) => Math.floor(x * fs.length),
    min<number>(fs.length - 1),
    (index: number) => (nth(index, fs) ?? fs[0])(x)
  )(x);

export const split = (f: EasingFunction) => (g: EasingFunction) =>
  splitN([f, g]);

const scaleAndShiftX = (i: number, length: number) =>
  pipe(scaleX(1 / length), shiftX(i / length));
const scaleAndShiftY = (i: number, length: number) =>
  pipe(scaleY(1 / length), shiftY(i / length));

const mapIndex = addIndex<EasingFunction>(map);

// since splitScale and sequence are so similar (but kind of complicated)
// we're reusing this structure to create both functions.
const splitScaleBase = (
  isSequenced: boolean
): Unary<EasingFunction[], EasingFunction> =>
  pipe(
    mapIndex((f, i, { length }) =>
      pipe(
        scaleAndShiftX(i, length),
        isSequenced ? scaleAndShiftY(i, length) : identity
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
