import { EasingFunction, ReturnsEasingFunction } from "../types";
import { I } from "../util/fpUtil";
import { mirror } from "../decorator/reflect";
import { wavify } from "../decorator/wavify";
import { applyTo, pipe } from "ramda";
import { threshold } from "./threshold";

const FULL_ROTATION_IN_RADIANS = Math.PI * 2;
const wavifyFunction = (f: EasingFunction) => pipe(wavify, applyTo(f));

export const sinusoid: ReturnsEasingFunction<number> =
  (frequency = 1) =>
  (x: number) =>
    Math.sin(x * frequency * FULL_ROTATION_IN_RADIANS) / 2 + 0.5;

export const sawtooth: ReturnsEasingFunction<number> = wavifyFunction(I);
export const triangle: ReturnsEasingFunction<number> = wavifyFunction(
  mirror(I)
);
export const pulse = (offset: number) => wavifyFunction(threshold(offset));
export const square = pulse(0.5);
