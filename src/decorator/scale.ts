import { curry, multiply, o, pipe, __ } from "ramda";
import { EasingFunction, EasingFunctionDecorator } from "../types";
import { p } from "../util/fpUtil";

// TODO: aliases
// scaleX = scaleDuration = 1/scaleFreq
// scaleY = scaleAmp

export const scaleX = curry(
  (scale: number, f: EasingFunction): EasingFunction =>
    p((x: number) => (scale === 0 ? 0 : x / scale))(f),
);

export const scaleY = curry(
  (scale: number, f: EasingFunction): EasingFunction => o(multiply(scale))(f),
);

export const scaleXY = curry(
  (scale: number, f: EasingFunction): EasingFunction =>
    pipe(
      scaleY(scale) as EasingFunctionDecorator,
      scaleX(scale) as EasingFunctionDecorator,
    )(f),
);
