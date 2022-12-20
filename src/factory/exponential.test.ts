import { expectTestRange } from "../test/testUtil";
import { I, K } from "../util/fpUtil";
import * as exponential from "./exponential";

describe("factories", () => {
  describe("exp()", () => {
    describe("Returns a function where x is multiplied by itself some number of times.", () => {
      it("Should return a function (n)->n", () => {
        const quad = exponential.exp(2);
        expect(quad).toBeInstanceOf(Function);
        expect(typeof quad(1)).toBe("number");
      });
      it("exp(0)(x) === K(1)(x)", () => {
        const one = K(1);
        const exp0 = exponential.exp(0);
        expectTestRange(exp0).toMatchFunction(one);
      });
      it("exp(1)(x) === I(x)", () => {
        const exp1 = exponential.exp(1);

        expectTestRange(exp1).toMatchFunction(I);
      });
      it("Should work with fractions & negatives ", () => {
        expect(exponential.exp(-1)(0.5)).toBe(2);
        expect(exponential.exp(2.5)(0.5)).toBeCloseTo(
          Math.sqrt(0.5) * 0.5 * 0.5
        );
      });
    });
  });
  describe("poly()", () => {
    describe("Takes a list of coeficients (one for each exponent starting with 0) and creates a polynomial function", () => {
      it("poly(cs) === c0 * x ** 0 + c1 * x ** 1... cn * x ** n", () => {
        const polyCubic = exponential.poly([0.1, 1, -1, 1]);
        const polyCubicManual = (x: number) => 0.1 + x - x ** 2 + x ** 3;

        expectTestRange(polyCubic).toMatchFunction(polyCubicManual);
      });
    });
  });
});
