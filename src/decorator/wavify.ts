import { EasingFunction } from "../types";

const isCloseTo = (a: number) => (b: number) => Math.abs(a - b) < 0.0001;

export const wavify =
  (frequency: number) => (f: EasingFunction) => (x: number) => {
    if (Math.abs(x) === 0) return f(x);
    const scaled = frequency * x;
    const floored = Math.floor(scaled);
    const proc = isCloseTo(scaled)(floored) ? 1 : scaled - floored;

    return f(proc);
  };
