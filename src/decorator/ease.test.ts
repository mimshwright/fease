import { describe, expect, it } from "vitest";
import { cubicIn } from "../preset";
import { easeInOut, easeMiddle, easeOut, easeOutIn } from "./ease";
import { reflectXY } from "./reflect";

describe.concurrent("Decorators - eases", () => {
  describe("easeOut", () => {
    it("Should turn an ease in into an ease out. Does this by using reflectXY. Will be covered by reflectXY", () => {
      expect(easeOut).toBe(reflectXY);
    });
  });
  describe("easeInOut", () => {
    it("Should convert an easeIn to an easeInOut", () => {
      const cubicInOut = easeInOut(cubicIn);
      expect(cubicInOut).toBeTypeOf("function");
      expect(cubicIn(1)).toBeTypeOf("number");
      expect(cubicInOut(1)).toBeTypeOf("number");
      expect(cubicInOut(0.5)).toBeCloseTo(0.5);
      expect(cubicInOut(0.75)).toBeCloseTo(1 - cubicInOut(0.25));
    });
  });
  describe("easeOutIn", () => {
    it("Should convert an easeIn to an easeOutIn", () => {
      const cubicOutIn = easeOutIn(cubicIn);
      expect(cubicOutIn).toBeTypeOf("function");
      expect(cubicOutIn(1)).toBeTypeOf("number");
      expect(cubicOutIn(0.5)).toBeCloseTo(0.5);
      expect(cubicOutIn(0.75)).toBeCloseTo(1 - cubicOutIn(0.25));
    });
  });
  describe("easeMiddle", () => {
    it("Should be an alias for easeOutIn", () => {
      expect(easeMiddle).toBe(easeOutIn);
    });
  });
});
