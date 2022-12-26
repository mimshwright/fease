import { EasingFunction } from "../types";
import { reflectXY } from "./reflect";
import { sequence } from "./split";

export const easeOut = reflectXY;
export const easeInOut = (f: EasingFunction) => sequence([f, easeOut(f)]);
export const easeOutIn = (f: EasingFunction) => sequence([easeOut(f), f]);
export const easeMiddle = easeOutIn;
