import { multiply, o, pipe, __ } from "ramda";
import { EasingFunctionDecorator } from "../types";
import { p } from "../util/fpUtil";

// TODO: aliases
// scaleX = scaleDuration = 1/scaleFreq
// scaleY = scaleAmp

export const scaleX = (scale: number): EasingFunctionDecorator =>
  p((x: number) => (scale === 0 ? 0 : x / scale));

export const scaleY = (scale: number): EasingFunctionDecorator =>
  o(multiply(scale));

export const scaleXY = (scale: number): EasingFunctionDecorator =>
  pipe(scaleY(scale), scaleX(scale));
