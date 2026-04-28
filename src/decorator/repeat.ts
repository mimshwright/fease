import { sequence, splitScale } from "../combinator";
import { curry, repeat as arrayOfCopies } from "ramda";

import { EasingFunction } from "./../types";

export const repeat = curry(
  (times: number, f: EasingFunction): EasingFunction =>
    splitScale(arrayOfCopies(f)(times)),
);

export const repeatSequence = curry(
  (times: number, f: EasingFunction): EasingFunction =>
    sequence(arrayOfCopies(f)(times)),
);
