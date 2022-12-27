import { describe, it, expect } from "vitest";
import { expectAll } from "../test/testUtil";
import { I } from "../util/fpUtil";
import * as limit from "./limit";

describe.concurrent("limit", () => {
  const vals = [-0.1, 0, 0.1, 0.25, 0.5, 1, 2];
  const clamp0208 = limit.clamp(0.2)(0.8)(I);

  describe("min()", () => {
    it("Should set a min value for the function.", () => {
      expectAll(vals)(limit.min(0.2)(I)).toBeCloseTo([
        0.2, 0.2, 0.2, 0.25, 0.5, 1, 2,
      ]);
      expectAll(vals)(limit.min(0)(I)).toBeCloseTo([
        0, 0, 0.1, 0.25, 0.5, 1, 2,
      ]);
      expectAll(vals)(limit.min(1.5)(I)).toBeCloseTo([
        1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 2,
      ]);
    });
  });
  describe("max()", () => {
    it("Should set a max value for the function.", () => {
      expectAll(vals)(limit.max(0.2)(I)).toBeCloseTo([
        -0.1, 0, 0.1, 0.2, 0.2, 0.2, 0.2,
      ]);
      expectAll(vals)(limit.max(0)(I)).toBeCloseTo([-0.1, 0, 0, 0, 0, 0, 0]);
      expectAll(vals)(limit.max(1.5)(I)).toBeCloseTo([
        -0.1, 0, 0.1, 0.25, 0.5, 1, 1.5,
      ]);
    });
  });
  describe("clamp()", () => {
    it("Should set min and max value for the function.", () => {
      expectAll(vals)(clamp0208).toBeCloseTo([
        0.2, 0.2, 0.2, 0.25, 0.5, 0.8, 0.8,
      ]);
    });
  });
  describe("clamp01()", () => {
    it("Should set min and max value for the function to 0 and 1.", () => {
      expectAll(vals)(limit.clamp01(I)).toBeCloseTo([
        0, 0, 0.1, 0.25, 0.5, 1, 1,
      ]);
    });
  });
  describe("forceStart0()", () => {
    it("Should force the function to return 0 for an input of 0 or less regardless of what it normally would.", () => {
      expectAll(vals)(limit.forceStart0(clamp0208)).toBeCloseTo([
        0, 0, 0.2, 0.25, 0.5, 0.8, 0.8,
      ]);
    });
  });
  describe("forceEnd1()", () => {
    it("Should force the function to return 1 for an input of 1 or more regardless of what it normally would.", () => {
      expectAll(vals)(limit.forceEnd1(clamp0208)).toBeCloseTo([
        0.2, 0.2, 0.2, 0.25, 0.5, 1, 1,
      ]);
    });
  });
  describe("forceStart0AndEnd1()", () => {
    it("Combines forceStart0 and forceEnd1", () => {
      expectAll(vals)(limit.forceStart0AndEnd1(clamp0208)).toBeCloseTo([
        0, 0, 0.2, 0.25, 0.5, 1, 1,
      ]);
    });
  });
  describe("abs(f)", () => {
    it("When values of the function go below 0 it makes them positive.", () => {
      const absI = limit.abs(I);
      expect(absI(1.5)).toBe(1.5);
      expect(absI(0.5)).toBe(0.5);
      expect(absI(-0.5)).toBe(0.5);
      expect(absI(-1.5)).toBe(1.5);
    });
  });
  describe("constrain()", () => {
    it("Should throw an error if high is not higher than low", () => {
      expect(() => {
        limit.constrain(1)(0)(I);
      }).toThrow();
      expect(() => {
        limit.constrain(0.5)(0.5)(I);
      }).toThrow();
      expect(() => {
        limit.constrain(0.5)(0.5001)(I);
      }).not.toThrow();
    });
    it("Should reflectvalues that go outside of the upper limit back towards the lower limit and vice versa.", () => {
      // FIXME: not passing
      // const cons56 = limit.constrain(0.5)(0.6)(I);
      // expect(cons56(0.5)).toBeCloseTo(0.5);
      // expect(cons56(0.6)).toBeCloseTo(0.6);
      // expect(cons56(0.65)).toBeCloseTo(0.55);
      // expect(cons56(0.55)).toBeCloseTo(0.55);
      // expect(cons56(0.45)).toBeCloseTo(0.55);
      // expect(cons56(0.4)).toBeCloseTo(0.6);
      // expect(cons56(0.35)).toBeCloseTo(0.55);
      // expect(cons56(0.3)).toBeCloseTo(0.5);

      const cons28 = limit.constrain(0.2)(0.8)(I);
      expect(cons28(0.5)).toBeCloseTo(0.5);
      expect(cons28(0.2)).toBeCloseTo(0.2);
      expect(cons28(0.1)).toBeCloseTo(0.3);
      expect(cons28(-0.2)).toBeCloseTo(0.6);
      expect(cons28(1)).toBeCloseTo(0.6);
      expect(cons28(1.4)).toBeCloseTo(0.2);
      expect(cons28(1.5)).toBeCloseTo(0.3);
    });
  });
  describe("constrain01()", () => {
    it("Is same as constrain with values preset to 0 and 1.", () => {
      expectAll(vals)(limit.constrain01(I)).toMatchFunction(
        limit.constrain(0)(1)(I)
      );
    });
  });
});
