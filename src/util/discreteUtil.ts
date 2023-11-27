import { min, multiply, pipe } from "ramda";

// converts a percentage to an integer between `0` to `steps-1'
export const percentToInt = (segments: number) =>
  pipe(multiply(segments), Math.floor, min(segments - 1));
