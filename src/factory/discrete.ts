import { head, last, pipe } from "ramda";
import { EasingFunction } from "../types";
import { percentToInt } from "../util/discreteUtil";

export const discrete = (values: number[]): EasingFunction =>
  pipe(percentToInt(values.length), (x: number) => values[x] ?? 0);

export const discreteBlend =
  (values: number[]): EasingFunction =>
  (x: number) => {
    const l = values.length;
    const position = x * (l - 1);
    const pctBtwSteps = position % 1;
    const lowIndex = Math.floor(position);
    const low = values[lowIndex] ?? head(values);
    const high = values[lowIndex + 1] ?? last(values);
    return (high - low) * pctBtwSteps + low;
  };
