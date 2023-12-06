import { describe, it, expect } from "vitest";
import { easingLerp, multiEase, lerp, render } from "./easeUtil";
import { I } from "./fpUtil";
import { linear, sinWave } from "../preset";
import { scaleY } from "../decorator";

const linear2x = scaleY(2)(linear);

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

  describe("multiEase()", () => {
    it("Should map one inputs to one output", () => {
      const o = multiEase(linear)(0.6);
      expect(o[0]).toEqual(0.6);
    });
    it("Should map many inputs to one output", () => {
      const f = multiEase(linear);
      const o = f([0, 0.5, 1]);
      expect(o[0]).toEqual(0);
      expect(o[1]).toEqual(0.5);
      expect(o[2]).toEqual(1);
    });
    it("Should map one input to many easing function outputs.", () => {
      const fs = [linear, sinWave, linear2x];
      const f = multiEase(fs);
      expect(f(0)[0]).toBeCloseTo(0);
      expect(f(0)[1]).toBeCloseTo(0.5);
      expect(f(0)[2]).toBeCloseTo(0);

      expect(f(0.5)[0]).toBeCloseTo(0.5);
      expect(f(0.5)[1]).toBeCloseTo(0.5);
      expect(f(0.5)[2]).toBeCloseTo(1);

      expect(f(1)[0]).toBeCloseTo(1);
      expect(f(1)[1]).toBeCloseTo(0.5);
      expect(f(1)[2]).toBeCloseTo(2);
    });
    it("Should map multiple inputs to many easing function outputs.", () => {
      const fs = [linear, linear2x];
      const f = multiEase(fs);
      const o = f([0, 0.5, 1]);
      expect(o[0]).toBeCloseTo(0);
      expect(o[1]).toBeCloseTo(0.5);
      expect(o[2]).toBeCloseTo(1);
      expect(o[3]).toBeCloseTo(0);
      expect(o[4]).toBeCloseTo(1);
      expect(o[5]).toBeCloseTo(2);
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
