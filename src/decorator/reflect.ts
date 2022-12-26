import { EasingFunction } from "./../types";
import { splitScale } from "./split";
import { pipe } from "ramda";
import { scaleX, scaleY } from "./scale";
import { shiftX, shiftY } from "./shift";

export const reflectX = pipe(scaleX(-1), shiftX(1));
// todo: alias reverse

export const reflectY = pipe(scaleY(-1), shiftY(1));
export const reflectXY = pipe(reflectX, reflectY);

export const mirror = (f: EasingFunction) => splitScale([f, reflectX(f)]);
