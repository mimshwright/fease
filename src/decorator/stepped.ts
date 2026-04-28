import { curry } from "ramda";
import { discrete } from "../factory";
import { render } from "../util";
import { EasingFunction } from "./../types";

export const stepped = curry(
  (steps: number, f: EasingFunction): EasingFunction =>
    discrete(render(steps)(f)),
);
