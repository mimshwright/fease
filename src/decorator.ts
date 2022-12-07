import { pipe } from "ramda";
import { EasingFunction, Decorator } from "./types";

type EFDecorator = Decorator<number, number>;

// I
// K

// scaleX = scaleDuration = 1/scaleFreq
// scaleY = scaleAmp
// scaleXY

// reflectX
// reflectY
// reflectXY
// mirror f + reflectX(f)

// easeOut
// easeInOut
// easeMiddle

// switchN
// switch2
// sequence
// repeat
// oscillate

// stepped
// discrete (array)

// clamp
// clamp01
// forceEnd1
// forceStart0
// abs
// deflect / constrain

// addN
// add2
// mergeN (add + scaleY)
// merge2
// mult
// transition
// transitionWeighted

// export const shiftX
// shiftY
// shiftXY

export const scaleX =
  (scale: number): EFDecorator =>
  (f: EasingFunction) =>
  (x: number) =>
    f(x / scale);

export const scaleY =
  (scale: number): EFDecorator =>
  (f: EasingFunction) =>
  (x: number) =>
    f(x) * scale;

export const scaleXY = (scale: number): EFDecorator =>
  pipe(scaleY(scale), scaleX(scale));

// shiftXYscaleXY
