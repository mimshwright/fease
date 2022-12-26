import { min as _min, max as _max, pipe, o } from "ramda";
import { EasingFunction } from "../types";
import { constrain as _constrain } from "../util/easeUtil";

export const min = (minValue: number) => o(_max(minValue));
export const max = (maxValue: number) => o(_min(maxValue));
export const clamp = (minValue: number) => (maxValue: number) =>
  pipe(min(minValue), max(maxValue));
export const clamp01 = clamp(0)(1);

export const abs = o(Math.abs);

export const constrain = (low: number) => (high: number) =>
  o(_constrain(low)(high));
export const constrain01 = constrain(0)(1);

export const forceStart0 = (f: EasingFunction) => (x: number) =>
  x <= 0 ? 0 : f(x);
export const forceEnd1 = (f: EasingFunction) => (x: number) =>
  x >= 1 ? 1 : f(x);
export const forceStart0AndEnd1 = pipe(forceStart0, forceEnd1);
