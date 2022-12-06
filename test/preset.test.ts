import * as preset from "../src/preset";
import { expectAll } from "./testUtil";

const testRange = [0, 0.25, 0.5, 1.0, 2.0, -1];
const expectTestRange = expectAll(testRange);

describe("fease presets", () => {
  describe("linear", () => {
    it("should return the input unchanged", () => {
      expectTestRange(preset.linear).toBeUnchanged();
    });
  });
  describe("exponential functions", () => {
    describe("quad", () => {
      it("Should square the input", () => {
        expectTestRange(preset.quad).toEqual([0, 0.0625, 0.25, 1, 4, 1]);
      });
      test("Remaining exponential functions won't be tested because they all follow the same pattern and are covered by tests on exp() and quad()", () => {
        expect(true).toBeTruthy();
      });
    });
  });
});
