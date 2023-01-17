import { EasingFunction } from "./../types";
import { scaleX, scaleY } from "./scale";
import { shiftX, shiftY } from "./shift";
import { pipe } from "ramda";
import { splitScale } from "../combinator/split";

export const reflectX = pipe(scaleX(-1), shiftX(1));
// todo: alias reverse

export const reflectY = pipe(scaleY(-1), shiftY(1));
export const reflectXY = pipe(reflectX, reflectY);

export const mirror = (f: EasingFunction) => splitScale([f, reflectX(f)]);
