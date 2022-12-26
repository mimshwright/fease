import { min, multiply, pipe } from "ramda";

export const percentToInt = (segments: number) =>
  pipe(multiply(segments), Math.floor, min(segments - 1));
