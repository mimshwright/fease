import { describe, expect, it } from "vitest";
import { linear } from "../preset";
import { expectAll } from "../test/testUtil";
import { wavify } from "./wavify";

describe("Decorator - wavify", () => {
  const linWav1 = wavify(1)(linear);
  const linWav2 = wavify(2)(linear);
  it("Turns a normal function into one that repeats for values between 0 and 1", () => {
    expectAll([0, 0.1, 0.5, 0.99, 1.0])(linWav1).toMatchFunction(linear);
  });
  it("Should return max value when exactly on the max value.", () => {
    expect(linWav1(1)).toBe(1);
    expect(linWav2(0.5)).toBe(1);
    expect(linWav2(1)).toBe(1);
    expect(linWav2(0.5001)).toBeCloseTo(0);
  });
  it("Should reset to 0 when it reaches the end of the pattern.", () => {
    expect(linWav1(1.1)).toBeCloseTo(0.1);
  });
  it("Uses the frequency parameter to define the period in which the wave repeats.", () => {
    expectAll([0, 0.25, 0.5, 0.75, 1])(linWav2).toBeCloseTo([
      0, 0.5, 1, 0.5, 1,
    ]);
  });
});
