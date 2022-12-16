import { EasingFunction } from "../types";

export const wavify =
  (freq = 1) =>
  (f: EasingFunction) =>
  (x: number) =>
    f((x % (1 / freq)) * freq);
