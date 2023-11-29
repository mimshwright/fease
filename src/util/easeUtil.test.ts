import { describe, it, expect } from "vitest";
import { easingLerp, lerp, render } from "./easeUtil";
import { I } from "./fpUtil";
import { linear, sinWave } from "../preset";

describe.concurrent("utils - easeUtils", () => {
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

  describe("lerp()", () => {
    it("Should interpolate between two values", () => {
      const [start, end] = [40, 80];
      const ease = lerp(start)(end);
      expect(ease(0)).toBe(start);
      expect(ease(0.5)).toBe(0.5 * (80 - 40) + start);
      expect(ease(1)).toBe(end);
    });
  });

  describe("easingLerp()", () => {
    it("Should take an easing function and return a lerp function.", () => {
      const [start, end] = [40, 80];
      const diff = end - start;
      const linearLerp = easingLerp(linear);
      const sinLerp = easingLerp(sinWave);
      const linearEase = linearLerp(start)(end);
      const sinEase = sinLerp(start)(end);

      expect(linearEase(0)).toBe(start);
      expect(linearEase(0.5)).toBe(0.5 * diff + start);
      expect(linearEase(1)).toBe(end);

      expect(sinEase(0)).toBe(diff * 0.5 + start);
      expect(sinEase(0.25)).toBe(diff * 1 + start);
      expect(sinEase(0.5)).toBe(diff * 0.5 + start);
      expect(sinEase(0.75)).toBe(diff * 0 + start);
      expect(sinEase(1)).toBe(diff * 0.5 + start);
    });
  });
});
