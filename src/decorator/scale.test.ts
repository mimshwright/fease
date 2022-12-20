import { expectTestRange } from "../test/testUtil";
import { sinWave, linear } from "../preset";
import { scaleX, scaleY, scaleXY } from "./scale";
import { always } from "ramda";
import { I } from "../util";

describe("decorators - scale", () => {
  describe("scaleX()", () => {
    describe("Takes a scalar value and an input function scale an input function on the X axis.", () => {
      const f = linear;
      const fSlow = scaleX(2)(f);
      const fFast = scaleX(0.5)(f);
      const fReverse = scaleX(-1)(f);
      const fZero = scaleX(0)(f);

      it("When scaling down should increase the rate at which the function completes.", () => {
        expect(fSlow(0)).toBeCloseTo(0);
        expect(fSlow(0.5)).toBeCloseTo(0.25);
        expect(fSlow(1.0)).toBeCloseTo(0.5);
      });
      it("When scaling up should decrease the rate at which the function completes.", () => {
        expect(fFast(0)).toBeCloseTo(0);
        expect(fFast(0.5)).toBeCloseTo(1);
        expect(fFast(1.0)).toBeCloseTo(2);
      });
      it("Allows negative scaling", () => {
        expect(fReverse(0)).toBeCloseTo(-0);
        expect(fReverse(0.5)).toBeCloseTo(-0.5);
        expect(fReverse(1.0)).toBeCloseTo(-1.0);
      });
      it("scaleX(0)(f)(x) === (x) => 0 (prevent div by 0)", () => {
        const scaleX0 = scaleX(0);
        const zero = scaleX0(I);
        expect(zero(0)).toBe(0);
        expect(zero(2)).toBe(0);
        expectTestRange(fZero).toMatchFunction(always(0));
      });
    });
  });
  describe("scaleY()", () => {
    describe("Takes a scalar value and an input function scale an input function on the Y axis.", () => {
      const f = linear;
      const fBig = scaleY(2)(f);
      const fSmall = scaleY(0.5)(f);
      const fNegative = scaleY(-1)(f);
      const fZero = scaleY(0)(f);

      it("When scaling up should increase the intensity of the function.", () => {
        expect(fBig(0)).toBeCloseTo(0);
        expect(fBig(0.5)).toBeCloseTo(1);
        expect(fBig(1.0)).toBeCloseTo(2);
      });
      it("When scaling down should decrease the intensity of the function.", () => {
        expect(fSmall(0)).toBeCloseTo(0);
        expect(fSmall(0.5)).toBeCloseTo(0.25);
        expect(fSmall(1.0)).toBeCloseTo(0.5);
      });
      it("Allows negative scaling", () => {
        expect(fNegative(0)).toBeCloseTo(-0);
        expect(fNegative(0.5)).toBeCloseTo(-0.5);
        expect(fNegative(1.0)).toBeCloseTo(-1.0);
      });
      it("scaleY(0)(f)(x) === (x) => 0", () => {
        expect(fZero(0)).toBeCloseTo(0);
        expect(fZero(0.5)).toBeCloseTo(0);
        expect(fZero(1.0)).toBeCloseTo(0);
      });
    });
  });
  describe("scaleXY()", () => {
    describe("Combines scaleX and scaleY.", () => {
      const f = sinWave;
      const fDouble = scaleXY(2)(f);
      const fHalf = scaleXY(0.5)(f);

      it("When scaling up should increase the intensity and decrease frequency of the function.", () => {
        expect(fDouble(0)).toBeCloseTo(1.0);
        expect(fDouble(0.5)).toBeCloseTo(2);
        expect(fDouble(1)).toBeCloseTo(1.0);
      });
      it("When scaling up should decrease the intensity and increase frequency of the function.", () => {
        expect(fHalf(0.0)).toBeCloseTo(0.25);
        expect(fHalf(0.125)).toBeCloseTo(0.5);
        expect(fHalf(0.25)).toBeCloseTo(0.25);
        expect(fHalf(0.375)).toBeCloseTo(0.0);
      });
    });
  });
});
