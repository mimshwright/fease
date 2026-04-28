import { addIndex, curry, identity, map, min, nth, pipe } from "ramda";
import {
  Combinator2,
  CombinatorMany,
  EasingFunction,
  EasingFunctionDecorator,
} from "../types";
import { scaleX, scaleY } from "../decorator/scale";
import { shiftX, shiftY } from "../decorator/shift";

export const splitN: CombinatorMany = (fs) => (x: number) =>
  pipe(
    (x) => Math.floor(x * fs.length),
    min<number>(fs.length - 1),
    (index: number) => (nth(index, fs) ?? fs[0])(x),
  )(x);

export const split: Combinator2 = curry(
  (f: EasingFunction, g: EasingFunction): EasingFunction => splitN([f, g]),
);

const mapIndex = addIndex<EasingFunction>(map);
const scaleAndShiftX = (i: number, length: number): EasingFunctionDecorator =>
  pipe(
    scaleX(1 / length) as EasingFunctionDecorator,
    shiftX(i / length) as EasingFunctionDecorator,
  );
const scaleAndShiftY = (i: number, length: number): EasingFunctionDecorator =>
  pipe(
    scaleY(1 / length) as EasingFunctionDecorator,
    shiftY(i / length) as EasingFunctionDecorator,
  );

// since splitScale and sequence are so similar (but kind of complicated)
// we're reusing this structure to create both functions.
const splitScaleBase = (isSequenced: boolean): CombinatorMany =>
  pipe(
    mapIndex((f, i, { length }) =>
      pipe(
        scaleAndShiftX(i, length),
        isSequenced
          ? scaleAndShiftY(i, length)
          : (identity as EasingFunctionDecorator),
      )(f),
    ),
    splitN,
  );

export const splitScale: CombinatorMany = splitScaleBase(false);
export const sequence: CombinatorMany = splitScaleBase(true);
