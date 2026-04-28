import { EasingFunction } from "../types";
import { reflectXY } from "./reflect";
import { sequence } from "../combinator/split";

export const easeOut = reflectXY;
export const easeInOut = (f: EasingFunction): EasingFunction =>
  sequence([f, easeOut(f)]);
export const easeOutIn = (f: EasingFunction): EasingFunction =>
  sequence([easeOut(f), f]);
export const easeMiddle = easeOutIn;
