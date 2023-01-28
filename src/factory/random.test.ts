import { describe, it, expect } from "vitest";
import { fixedRandom, random, smoothRandom } from "./random";

describe("random", () => {
  describe("random()", () => {
    it("Should return the same results for the same seed.", () => {
      const r = random(1);
      const expected = [r(0), r(0.1), r(0.2), r(0.3)];
      const expectedNot = [r(0), r(0.1), r(0.2), r(0.3)];

      const s = random(1);
      const actual = [s(0), s(0.1), s(0.2), s(0.3)];
      const actualNot = [s(0), s(0.1), s(0.2), s(0.3)];

      const t = random(9999);
      const fail = [t(0), t(0.1), t(0.2), t(0.3)];

      expect(actual).toMatchObject(expected);
      expect(actual).not.toMatchObject(expectedNot);
      expect(actualNot).not.toMatchObject(expected);
      expect(actualNot).toMatchObject(expectedNot);
      expect(actual).not.toMatchObject(fail);
    });
  });
  describe("fixedRandom()", () => {
    it("Should return the same results for the same seed and input.", () => {
      const r = fixedRandom(1);
      const expected = [r(0), r(0.1), r(0.2), r(0.3)];
      const expectedAlso = [r(0), r(0.1), r(0.2), r(0.3)];

      const s = fixedRandom(1);
      const actual = [s(0), s(0.1), s(0.2), s(0.3)];
      const actualAlso = [s(0), s(0.1), s(0.2), s(0.3)];

      const t = fixedRandom(9999);
      const fail = [t(0), t(0.1), t(0.2), t(0.3)];

      expect(actual).toMatchObject(expected);
      expect(actual).toMatchObject(expectedAlso);
      expect(actualAlso).toMatchObject(expected);
      expect(actual).not.toMatchObject(fail);
    });
  });
  describe("smoothRandom()", () => {
    it("Will give results that move between some fixed number of discrete values.", () => {
      const r = smoothRandom(1)(10);
      const results = [r(0), r(0.1), r(0.2), r(0.3)];

      expect(results[0]).toBe(0);
      expect(results[1]).toBeGreaterThan(0);
      expect(r(0.05)).toBeCloseTo((results[1] - results[0]) / 2);
    });
  });
  it("always return 0 or 1 for inputs of 0 or 1", () => {
    const r = random(123);
    const fr = fixedRandom(456);
    const sr = smoothRandom(789)(100);

    expect(r(0)).toBe(0);
    expect(fr(0)).toBe(0);
    expect(sr(0)).toBe(0);

    expect(r(1)).toBe(1);
    expect(fr(1)).toBe(1);
    expect(sr(1)).toBe(1);
  });
});
