import { describe, it, expect } from "vitest";
import { discrete, discreteBlend } from "./discrete";

describe("Factory - discrete", () => {
  describe("discrete()", () => {
    it("Takes a list of discrete values and returns a function that when called with a number between 0 and 1, returns one of those values.", () => {
      const vals = [0, 0.025, 0.05, 0.1, 0.2, 0.4, 0.8, 1.6];
      const doubling = discrete(vals);
      expect(doubling(0 / 8)).toBe(0);
      expect(doubling(0.01)).toBe(0);
      expect(doubling(1 / 8)).toBe(0.025);
      expect(doubling(2 / 8)).toBe(0.05);
      expect(doubling(3 / 8)).toBe(0.1);
      expect(doubling(4 / 8)).toBe(0.2);
      expect(doubling(5 / 8)).toBe(0.4);
      expect(doubling(6 / 8)).toBe(0.8);
      expect(doubling(7 / 8)).toBe(1.6);
      expect(doubling(0.99)).toBe(1.6);
      expect(doubling(8 / 8)).toBe(1.6);

      const d2 = discrete([0.25, 0.75]);
      expect(d2(0)).toBe(0.25);
      expect(d2(0.49)).toBe(0.25);
      expect(d2(0.5)).toBe(0.75);
      expect(d2(0.99)).toBe(0.75);
      expect(d2(1.0)).toBe(0.75);

      const d3 = discrete([0, 0.2, 1.0]);
      expect(d3(0)).toBe(0.0);
      expect(d3(0.332)).toBe(0);
      expect(d3(0.334)).toBe(0.2);
      expect(d3(0.5)).toBe(0.2);
      expect(d3(0.665)).toBe(0.2);
      expect(d3(0.667)).toBe(1.0);
      expect(d3(1.0)).toBe(1.0);
    });
  });

  describe("discreteBlend()", () => {
    it("Similar to discrete() but rather than static output of each value, interpolates between them.", () => {
      const vals = [0, 0.2, 1.0];
      const ex = discreteBlend(vals);
      expect(ex(0)).toBeCloseTo(0);
      expect(ex(0.001)).toBeCloseTo(0.0001);
      expect(ex(0.25)).toBeCloseTo(0.1);
      expect(ex(0.5)).toBeCloseTo(0.2);
      expect(ex(0.75)).toBeCloseTo(0.6);
      expect(ex(1)).toBeCloseTo(1);
    });
  });
});
