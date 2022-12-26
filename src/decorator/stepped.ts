import { discrete } from "../factory";
import { render } from "../util";
import { EasingFunctionDecorator } from "./../types";

export const stepped =
  (steps: number): EasingFunctionDecorator =>
  (f) =>
    discrete(render(steps)(f));
