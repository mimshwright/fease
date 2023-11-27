import { describe, it, expect } from "vitest";
import { cubicIn, cubicOut, linear } from "../preset";
import { takeMax, takeMin } from "./minmax";

describe.concurrent("combinator: takeMin", () => {
  const fs = [linear, cubicIn, cubicOut];

  describe("takeMin()", () => {
    it("should take the lowest value from the results of applying a group of functions", () => {
      expect(takeMin(fs)(0)).toBe(0);
      expect(takeMin(fs)(0.25)).toBe(cubicIn(0.25));
      expect(takeMin(fs)(0.5)).toBe(cubicIn(0.5));
      expect(takeMin(fs)(1)).toBe(1);
    });
  });
  describe("takeMax()", () => {
    it("should take the highest value from the results of applying a group of functions", () => {
      expect(takeMax(fs)(0)).toBe(0);
      expect(takeMax(fs)(0.25)).toBe(cubicOut(0.25));
      expect(takeMax(fs)(0.5)).toBe(cubicOut(0.5));
      expect(takeMax(fs)(1)).toBe(1);
    });
  });
});
