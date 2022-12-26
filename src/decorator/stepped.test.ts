import { describe, it, expect } from "vitest";
import { linear } from "../preset";
import { stepped } from "./stepped";

describe("Decorator - stepped", () => {
  describe("stepped()", () => {
    it("Takes a number of steps and a function and returns a version of it that is split into `steps` discrete values.", () => {
      const steppedLinear = stepped(5)(linear);
      // 0 - 19.99% : 0
      expect(steppedLinear(0)).toBeCloseTo(0);
      expect(steppedLinear(0.1)).toBeCloseTo(0);
      expect(steppedLinear(0.199)).toBeCloseTo(0);
      // 20 - 39.99%: 0.25,
      expect(steppedLinear(0.2)).toBeCloseTo(0.25);
      expect(steppedLinear(0.399)).toBeCloseTo(0.25);
      // 40 - 59.99%: 0.5,
      expect(steppedLinear(0.4)).toBeCloseTo(0.5);
      // 60 - 79.99%: 0.75,
      expect(steppedLinear(0.6)).toBeCloseTo(0.75);
      // 80 - 100%: 1.0
      expect(steppedLinear(0.8)).toBeCloseTo(1);
      expect(steppedLinear(1)).toBeCloseTo(1);
    });
  });
});
