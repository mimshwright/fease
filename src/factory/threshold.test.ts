import { describe, it, expect } from "vitest";
import * as threshold from "./threshold";

describe.concurrent("factory threshold", () => {
  describe("threshold", () => {
    it("Takes a value for a threshold and creates a function that returns 0 if the input is below the threshold and 1 if the input is above the threshold.", () => {
      const f = threshold.threshold(0.5);
      expect(f(-1.0)).toBe(0);
      expect(f(0.0)).toBe(0);
      expect(f(0.25)).toBe(0);
      expect(f(0.5)).toBe(1);
      expect(f(0.51)).toBe(1);
      expect(f(1.0)).toBe(1);
      expect(f(2.0)).toBe(1);
    });
    it("Works for values other than 0.5", () => {
      const f = threshold.threshold(0.3);
      expect(f(0.25)).toBe(0);
      expect(f(0.3)).toBe(1);
      expect(f(0.49)).toBe(1);

      const g = threshold.threshold(-1.0);
      expect(g(-2)).toBe(0);
      expect(g(-1)).toBe(1);
      expect(g(1000)).toBe(1);
    });
  });
});
