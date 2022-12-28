import { addIndex, identity, map, min, nth, pipe } from "ramda";
import { Combinator2, CombinatorMany, EasingFunction } from "../types";
import { scaleX, scaleY, shiftX, shiftY } from "../decorator";

export const splitN: CombinatorMany = (fs) => (x: number) =>
  pipe(
    (x) => Math.floor(x * fs.length),
    min<number>(fs.length - 1),
    (index: number) => (nth(index, fs) ?? fs[0])(x)
  )(x);

export const split: Combinator2 = (f) => (g) => splitN([f, g]);

const mapIndex = addIndex<EasingFunction>(map);
const scaleAndShiftX = (i: number, length: number) =>
  pipe(scaleX(1 / length), shiftX(i / length));
const scaleAndShiftY = (i: number, length: number) =>
  pipe(scaleY(1 / length), shiftY(i / length));

// since splitScale and sequence are so similar (but kind of complicated)
// we're reusing this structure to create both functions.
const splitScaleBase = (isSequenced: boolean): CombinatorMany =>
  pipe(
    mapIndex((f, i, { length }) =>
      pipe(
        scaleAndShiftX(i, length),
        isSequenced ? scaleAndShiftY(i, length) : identity
      )(f)
    ),
    splitN
  );

export const splitScale: CombinatorMany = splitScaleBase(false);
export const sequence: CombinatorMany = splitScaleBase(true);
