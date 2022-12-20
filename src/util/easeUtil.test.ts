import { render, constrain } from "./easeUtil";
import { I } from "./fpUtil";

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

  describe("constrain()", () => {
    describe('keeps input numbers within a range by "bouncing" the values back when the limit is reached.', () => {
      const constrain01 = constrain(0)(1);
      it("Shouldn't affect numbers within the range", () => {
        expect(constrain01(0.0)).toBe(0.0);
        expect(constrain01(0.5)).toBe(0.5);
        expect(constrain01(1)).toBe(1);
      });
      it("When it goes below the range it should reflect back up", () => {
        expect(constrain01(-0.25)).toBe(0.25);
        expect(constrain01(-0.75)).toBe(0.75);
        expect(constrain01(-1)).toBe(1);
      });
      it("When it goes above the range it should reflect back down", () => {
        expect(constrain01(1.25)).toBe(0.75);
        expect(constrain01(1.5)).toBe(0.5);
        expect(constrain01(1.75)).toBe(0.25);
        expect(constrain01(2)).toBe(0);
      });
      it("If the high value is reflected back past the low value, it starts going back up again. and vice versa", () => {
        expect(constrain01(2.25)).toBe(0.25);
        expect(constrain01(2.5)).toBe(0.5);
        expect(constrain01(3.5)).toBe(0.5);

        expect(constrain01(-1.25)).toBe(0.75);
        expect(constrain01(-1.5)).toBe(0.5);
        expect(constrain01(3)).toBe(1);
      });

      it("It should respond correctly when the constraint values are changed.", () => {
        const con = constrain(0.1)(0.9);

        expect(con(0.1)).toBeCloseTo(0.1);
        expect(con(0.5)).toBeCloseTo(0.5);
        expect(con(0.9)).toBeCloseTo(0.9);

        expect(con(1.0)).toBeCloseTo(0.8);
        expect(con(1.5)).toBeCloseTo(0.3);
        expect(con(1.7)).toBeCloseTo(0.1);
        expect(con(1.8)).toBeCloseTo(0.2);

        expect(con(0.0)).toBeCloseTo(0.2);
        expect(con(-0.1)).toBeCloseTo(0.3);
      });
    });
  });
});
