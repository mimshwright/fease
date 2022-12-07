import { render } from "./../src/util";
import { I } from "../src/factory";

describe("utils", () => {
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
