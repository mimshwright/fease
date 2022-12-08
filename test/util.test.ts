import { repeat } from "ramda";
import { render, I, K } from "./../src/util";
import { defaultTestRange, expectTestRange } from "./testUtil";

describe("utils", () => {
  describe("I", () => {
    it("should return the input unchanged", () => {
      expectTestRange(I).toBeUnchanged();
    });
  });
  describe("K", () => {
    it("Takes a value as input and returns an easing function that only ever returns that value.", () => {
      const half = K(0.5);
      expectTestRange(half).toEqual(repeat(0.5, defaultTestRange.length));
    });
  });

  describe("render()", () => {
    it("Should create an array of values using the function and 0..1 as input", () => {
      expect(render(11)(I)).toEqual([
        0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0,
      ]);
    });
    it("Should always render 0 and 1", () => {
      expect(render(2)(I)).toEqual([0, 1]);
      expect(render(1)(I)).toEqual([0, 1]);
      expect(render(0)(I)).toEqual([0, 1]);
      expect(render(-1)(I)).toEqual([0, 1]);
    });
  });
});
