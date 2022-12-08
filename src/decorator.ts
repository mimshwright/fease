import { pipe } from "ramda";
import { EasingFunction, EasingFunctionDecorator } from "./types";

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

export const shiftX =
  (offset: number): EasingFunctionDecorator =>
  (f: EasingFunction) =>
  (x: number) =>
    f(x - offset);

export const shiftY =
  (offset: number): EasingFunctionDecorator =>
  (f: EasingFunction) =>
  (x: number) =>
    f(x) + offset;
// shiftXY

export const scaleX =
  (scale: number): EasingFunctionDecorator =>
  (f: EasingFunction) =>
  (x: number) =>
    f(x / scale);

export const scaleY =
  (scale: number): EasingFunctionDecorator =>
  (f: EasingFunction) =>
  (x: number) =>
    f(x) * scale;

export const scaleXY = (scale: number): EasingFunctionDecorator =>
  pipe(scaleY(scale), scaleX(scale));

// shiftXYscaleXY
