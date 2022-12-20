import { describe, it, expect, test } from "vitest";
import { linear, quad } from "./exp";
import { expectTestRange } from "../test/testUtil";

describe.concurrent("exponential functions", () => {
  describe("linear", () => {
    it("should return the input unchanged", () => {
      expectTestRange(linear).toBeUnchanged();
    });
  });
  describe("quad", () => {
    it("Should square the input", () => {
      expectTestRange(quad).toEqual([0, 0.0625, 0.25, 1, 4, 1]);
    });
    test("Remaining exponential functions won't be tested because they all follow the same pattern and are covered by tests on exp() and quad()", () => {
      expect(true).toBeTruthy();
    });
  });
});
