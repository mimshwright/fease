import { describe, it, expect } from "vitest";
import { overshoot } from "./overshoot";

describe("overshoot", () => {
  describe("overshoot()", () => {
    it("Should create an easing function that extends beyond the endpoint then returns at the last moment.", () => {
      expect(overshoot(0.5)(0)).toBeCloseTo(0);
      expect(overshoot(0.5)(0.9)).toBeGreaterThan(1.0);
      expect(overshoot(0.5)(1)).toBeCloseTo(1.0);
    });
    it("Can be modified with a numeric value to increase the intensity", () => {
      expect(overshoot(0)(0)).toBeCloseTo(0);
      expect(overshoot(0)(0.8)).toBeLessThan(1.0);
      expect(overshoot(0)(1)).toBeCloseTo(1.0);

      expect(overshoot(1)(0.8)).toBeGreaterThan(1.0);
      expect(overshoot(1)(0.8)).toBeLessThan(1.7);

      expect(overshoot(10)(0)).toBeCloseTo(0);
      expect(overshoot(10)(0.7)).toBeGreaterThan(1.7);
      expect(overshoot(10)(1)).toBeCloseTo(1.0);
    });
  });
});
