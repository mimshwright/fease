import { describe, it, expect } from "vitest";
import { repeat } from "ramda";
import { defaultTestRange, expectTestRange } from "../test/testUtil";
import { I, K, p } from "./fpUtil";

describe.concurrent("utils - fpUtil", () => {
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
  describe("p", () => {
    describe("Like ramda's `o` but for `pipe` instead of `compose`", () => {
      it("Should compose in reverse order", () => {
        expect(p((x: number) => x ** 2)((x: number) => x + 1)(7)).toBe(50);
        expect(p((s: string) => s.length)((x: number) => x * 2)("hello")).toBe(
          10,
        );
      });
    });
  });
});
