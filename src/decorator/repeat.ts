import { sequence, splitScale } from "../combinator";
import { repeat as arrayOfCopies } from "ramda";

import { EasingFunctionDecorator } from "./../types";

export const repeat =
  (times: number): EasingFunctionDecorator =>
  (f) =>
    splitScale(arrayOfCopies(f)(times));

export const repeatSequence =
  (times: number): EasingFunctionDecorator =>
  (f) =>
    sequence(arrayOfCopies(f)(times));
