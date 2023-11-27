import { difference } from "./difference";
import { describe, it, expect, test } from "vitest";
import { cubicOut, linear, sinWave } from "../preset";

describe.concurrent("combinator: difference", () => {
  describe("difference()", () => {
    const id = difference(linear)(linear);
    const diff = difference(linear)(cubicOut);
    const diffSin = difference(sinWave)(linear);
    const diff2 = difference(cubicOut)(linear);
    test("identity", () => {
      expect(id(0)).toBeCloseTo(0);
      expect(id(0.5)).toBeCloseTo(0);
      expect(id(1)).toBeCloseTo(0);
    });
    it("should return the difference between the results of the functions.", () => {
      expect(diff(0)).toBeCloseTo(0);
      expect(diff(0.25)).toBeCloseTo(cubicOut(0.25) - 0.25);
      expect(diff(0.5)).toBeCloseTo(cubicOut(0.5) - 0.5);
      expect(diff(1)).toBeCloseTo(0);

      expect(diffSin(0.0)).toBeCloseTo(0.5);
      expect(diffSin(0.25)).toBeCloseTo(0.75);
      expect(diffSin(0.5)).toBeCloseTo(0);
      expect(diffSin(0.75)).toBeCloseTo(0.75);
      expect(diffSin(1)).toBeCloseTo(0.5);
    });
    it("Result should not go below 0", () => {
      expect(diff(0.25)).toBeCloseTo(diff2(0.25));
    });
  });
});
