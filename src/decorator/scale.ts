import { pipe } from "ramda";
import { EasingFunction, EasingFunctionDecorator } from "../types";

// TODO: aliases
// scaleX = scaleDuration = 1/scaleFreq
// scaleY = scaleAmp

export const scaleX =
  (scale: number): EasingFunctionDecorator =>
  (f: EasingFunction) =>
  (x: number) =>
    scale === 0 ? 0 : f(x / scale);

export const scaleY =
  (scale: number): EasingFunctionDecorator =>
  (f: EasingFunction) =>
  // pipe(f, multiply(scale));
  (x: number) =>
    f(x) * scale;

export const scaleXY = (scale: number): EasingFunctionDecorator =>
  pipe(scaleY(scale), scaleX(scale));
