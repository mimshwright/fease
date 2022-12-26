import { describe, it, expect } from "vitest";
import { percentToInt } from "./discreteUtil";

describe("Util - Discrete util", () => {
  describe("percentToInt()", () => {
    it("converts a percentage to an integer between `0` to `steps-1`", () => {
      const five = percentToInt(5);
      expect(five(0 / 5)).toBe(0);
      expect(five(1 / 5)).toBe(1);
      expect(five(2 / 5)).toBe(2);
      expect(five(3 / 5)).toBe(3);
      expect(five(4 / 5)).toBe(4);
      expect(five(5 / 5)).toBe(4);
      expect(five(6 / 5)).toBe(4);
    });
  });
});
