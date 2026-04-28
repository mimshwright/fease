import { EasingFunction, EasingFunctionDecorator } from "./../types";
import { scaleX, scaleY } from "./scale";
import { shiftX, shiftY } from "./shift";
import { pipe } from "ramda";
import { splitScale } from "../combinator/split";

export const reflectX: EasingFunctionDecorator = pipe(
  scaleX(-1) as EasingFunctionDecorator,
  shiftX(1) as EasingFunctionDecorator,
);
// TODO: alias reverse

export const reflectY: EasingFunctionDecorator = pipe(
  scaleY(-1) as EasingFunctionDecorator,
  shiftY(1) as EasingFunctionDecorator,
);
export const reflectXY: EasingFunctionDecorator = pipe(reflectX, reflectY);

export const mirror = (f: EasingFunction) => splitScale([f, reflectX(f)]);
