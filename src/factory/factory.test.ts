import * as decorator from "../decorator";
import * as factory from ".";
import { I, K } from "../util";
import { expectAll } from "../test/testUtil";

const testRange = [0, 0.25, 0.5, 1.0, 2.0, -1];
const expectTestRange = expectAll(testRange);

describe("factories", () => {
  describe("scales", () => {
    const quad = factory.exp(2);
    describe("scaleX()", () => {
      describe('Scales a function\'s output so that the shape is stretched horizontally. This can be thought of as changing the "duration" of the function with a lower number making it faster and higher making it slower.', () => {
        const slower = decorator.scaleX(2);
        const same = decorator.scaleX(1);
        const faster = decorator.scaleX(0.5);

        it("scales the function on horizontal axis", () => {
          expectTestRange(slower(quad)).toEqual([
            0, 0.015625, 0.0625, 0.25, 1, 0.25,
          ]);
          expectTestRange(faster(quad)).toEqual([0, 0.25, 1, 4, 16, 4]);
        });
        it("scaleX(1)(f)(x) === f(x)", () => {
          expectTestRange(same(quad)).toMatchFunction(quad);
        });
      });
    });
    describe("scaleY()", () => {
      describe('Scales a function\'s output so that the shape is stretched vertically. This can be thought of as changing the "amplitude" of the function.', () => {
        const smaller = decorator.scaleY(0.5);
        const same = decorator.scaleY(1);
        const bigger = decorator.scaleY(2);

        it("scales the function on vertical axis", () => {
          // input ** 2 / 2
          expectTestRange(smaller(quad)).toEqual([
            0, 0.03125, 0.125, 0.5, 2, 0.5,
          ]);
          // input ** 2 * 2
          expectTestRange(bigger(quad)).toEqual([0, 0.125, 0.5, 2, 8, 2]);
        });
        it("scaleY(1)(f)(x) === f(x)", () => {
          expectTestRange(same(quad)).toMatchFunction(quad);
        });
      });
      describe("scaleXY()", () => {
        describe("Scales horizontally and verticallly by the same value.", () => {
          const scale50 = decorator.scaleXY(0.5);
          const scale70 = decorator.scaleXY(0.7);
          const same = decorator.scaleXY(1);
          const sin = factory.sinusoid(1);

          it("scales numbers on vertical and horizontal axis simultaneously", () => {
            expectTestRange(scale50(sin)).toBeCloseTo([
              0.25, 0.25, 0.25, 0.25, 0.25, 0.25,
            ]);
            expect(scale50(sin)(0.125)).toBeCloseTo(0.5);
          });
          it("scaleXY(n)(f)(x) === scaleY(n)(scaleX(n)(f))(x)", () => {
            expectTestRange(scale70(sin)).toMatchFunction(
              decorator.scaleY(0.7)(decorator.scaleX(0.7)(sin))
            );
          });
          it("scaleXY(n)(f)(x) === scaleX(n)(scaleY(n)(f))(x)", () => {
            expectTestRange(scale70(sin)).toMatchFunction(
              decorator.scaleX(0.7)(decorator.scaleY(0.7)(sin))
            );
          });
          it("scaleXY(1)(f)(x) === f(x)", () => {
            expectTestRange(same(quad)).toMatchFunction(quad);
          });
        });
      });
    });
  });

  describe("exp()", () => {
    describe("Returns a function where x is multiplied by itself some number of times.", () => {
      it("Should return a function (n)->n", () => {
        const quad = factory.exp(2);
        expect(quad).toBeInstanceOf(Function);
        expect(typeof quad(1)).toBe("number");
      });
      it("exp(0)(x) === K(1)(x)", () => {
        const one = K(1);
        const exp0 = factory.exp(0);
        expectTestRange(exp0).toMatchFunction(one);
      });
      it("exp(1)(x) === I(x)", () => {
        const exp1 = factory.exp(1);

        expectTestRange(exp1).toMatchFunction(I);
      });
      it("Should work with fractions & negatives ", () => {
        expect(factory.exp(-1)(0.5)).toBe(2);
        expect(factory.exp(2.5)(0.5)).toBeCloseTo(Math.sqrt(0.5) * 0.5 * 0.5);
      });
    });
  });
  describe("poly()", () => {
    describe("Takes a list of coeficients (one for each exponent starting with 0) and creates a polynomial function", () => {
      it("poly(cs) === c0 * x ** 0 + c1 * x ** 1... cn * x ** n", () => {
        const polyCubic = factory.poly([0.1, 1, -1, 1]);
        const polyCubicManual = (x: number) => 0.1 + x - x ** 2 + x ** 3;

        expectTestRange(polyCubic).toMatchFunction(polyCubicManual);
      });
    });
  });
});
