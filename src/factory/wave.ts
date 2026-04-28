import { reflectX } from "./../decorator/reflect";
import { shiftX, shiftY } from "./../decorator/shift";
import {
  EasingFunction,
  EasingFunctionDecorator,
  ReturnsEasingFunction,
} from "../types";
import { I } from "../util/fpUtil";
import { mirror } from "../decorator/reflect";
import { wavify } from "../decorator/wavify";
import { applyTo, curry, pipe, reduce, times } from "ramda";
import { threshold } from "./threshold";
import { circular } from "./circular";
import { easeInOut } from "../decorator/ease";
import { scaleX } from "../decorator";

const FULL_ROTATION_IN_RADIANS = Math.PI * 2;
const wavifyFunction = (f: EasingFunction): ReturnsEasingFunction<number> =>
  pipe(wavify, applyTo(f)) as ReturnsEasingFunction<number>;

export const sinusoid = curry(
  (phase: number, frequency: number): EasingFunction =>
    (shiftX(-phase / frequency) as EasingFunctionDecorator)(
      (x: number) =>
        Math.sin(x * frequency * FULL_ROTATION_IN_RADIANS) / 2 + 0.5,
    ),
);

export const sine: ReturnsEasingFunction<number> = sinusoid(
  0,
) as ReturnsEasingFunction<number>;
export const cosine: ReturnsEasingFunction<number> = sinusoid(
  0.25,
) as ReturnsEasingFunction<number>;
export const sawtooth: ReturnsEasingFunction<number> = wavifyFunction(I);
export const triangle: ReturnsEasingFunction<number> = wavifyFunction(
  mirror(I),
);
export const pulse = (offset: number) => wavifyFunction(threshold(offset));
export const square = pulse(0.5);

const circEaseInOut = easeInOut(circular());
export const circle: ReturnsEasingFunction<number> = wavifyFunction(
  mirror(circEaseInOut),
);
const sine1 = sine(1);
const nOddNumbers = times((step: number) => step * 2 + 1);
const nEvenNumbers = times((step: number) => step * 2 + 2);

const calculateHarmonic = (harmonic: number) => (x: number) =>
  sine1(harmonic * x) * (1 / harmonic) - (harmonic === 1 ? 0 : 0.5 / harmonic);

export const analogSquare = (resolution: number) =>
  wavifyFunction((x: number) =>
    reduce(
      (result: number, harmonic: number) =>
        result + calculateHarmonic(harmonic)(x),
      0,
      nOddNumbers(resolution),
    ),
  );

const adjustSaw = pipe(
  scaleX(2) as EasingFunctionDecorator,
  shiftY(0.5) as EasingFunctionDecorator,
  reflectX,
);
export const analogSaw = (resolution: number) =>
  wavifyFunction(
    adjustSaw((x: number) =>
      reduce(
        (result: number, harmonic: number) =>
          result + calculateHarmonic(harmonic)(x),
        0,
        nEvenNumbers(resolution),
      ),
    ),
  );
