import { I } from "../util/fpUtil";
import * as limit from "./limit";

describe("limit", () => {
  describe("abs(f)", () => {
    it("When values of the function go below 0 it makes them positive.", () => {
      const absI = limit.abs(I);
      expect(absI(1.5)).toBe(1.5);
      expect(absI(0.5)).toBe(0.5);
      expect(absI(-0.5)).toBe(0.5);
      expect(absI(-1.5)).toBe(1.5);
    });
  });
});
