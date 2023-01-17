import { linear, cubic } from "../preset/exp";
import { describe, it, expect } from "vitest";
import { expectAll } from "../test/testUtil";
import { sequence, split, splitN, splitScale } from "./split";

describe.concurrent("Decorator - split", () => {
  describe("splitN", () => {
    it("Should take an array of n easing funcitons and return a single funciton that switches between them over time.", () => {
      const splitEx = splitN([linear, cubic, linear]);
      expectAll([0.0, 0.1, 0.3, 0.33, 0.67, 0.8, 0.9, 1.0])(
        splitEx
      ).toMatchFunction(linear);
      expectAll([0.34, 0.4, 0.5, 0.6, 0.665])(splitEx).toMatchFunction(cubic);
    });
  });
  describe("split", () => {
    it("is splitN but for only 2 inputs.", () => {
      const split2 = split(linear)(cubic);
      expectAll([0.0, 0.3, 0.49])(split2).toMatchFunction(linear);
      expectAll([0.5, 0.8, 1.0])(split2).toMatchFunction(cubic);
    });
  });
  describe("splitScale", () => {
    it("Should call split but also scale the functions so that each function has the full range of output. Same as scaling x * 0.5 then splitting", () => {
      const splitScaleEx = splitScale([linear, cubic, linear]);
      expect(splitScaleEx).toBeInstanceOf(Function);
      expect(splitScaleEx(0)).toBe(0);
      expect(splitScaleEx(1 / 6)).toBeCloseTo(0.5);
      expect(splitScaleEx(0.33333)).toBeCloseTo(1);
      expect(splitScaleEx(0.334)).toBeCloseTo(0);
      expect(splitScaleEx(0.66666)).toBeCloseTo(1);
      expect(splitScaleEx(5 / 6)).toBeCloseTo(0.5);
    });
  });
  describe("sequence", () => {
    it("Should similar to splitScale but also scales and shifts on the Y axis so that each animation contuinues into the the next one in a sequence.", () => {
      const sequenceEx = sequence([linear, cubic, linear]);
      expect(sequenceEx).toBeInstanceOf(Function);
      expect(sequenceEx(0)).toBe(0);
      expect(sequenceEx(1 / 6)).toBeCloseTo(1 / 6);
      expect(sequenceEx(0.33333)).toBeCloseTo(1 / 3);
      expect(sequenceEx(0.5)).toBeCloseTo(cubic(0.5) / 3 + 1 / 3);
      expect(sequenceEx(5 / 6)).toBeCloseTo(5 / 6);
      expect(sequenceEx(6 / 6)).toBeCloseTo(6 / 6);
    });
  });
});
