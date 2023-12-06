import { describe, it } from "vitest";
import { linear } from "../preset/exp";
import { expectAll } from "../test/testUtil";
import * as wave from "./wave";

describe.concurrent("waveform factories", () => {
  describe("sinusoid()", () => {
    it("Should generate a sine-like wave with phase and freqency.", () => {
      expectAll([0, 1 / 4, 1 / 2, 1])(wave.sinusoid(0)(3)).toMatchFunction(
        wave.sine(3),
      );
      expectAll([0, 1 / 4, 1 / 2, 1])(wave.sinusoid(0.25)(3)).toMatchFunction(
        wave.cosine(3),
      );
      expectAll([0, 1 / 4, 1 / 2, 1])(wave.sinusoid(0.5)(3)).toMatchFunction(
        (x: number) => 1 - wave.sine(3)(x),
      );
    });
  });
  describe("sine()", () => {
    it("Should generate a sine wave with input scaled by 2π so every 1 of input is a full rotation", () => {
      const sin1 = wave.sine(1);
      expectAll([0, 1 / 4, 1 / 2, 1, 5 / 4, -1 / 4])(sin1).toBeCloseTo([
        0.5, 1, 0.5, 0.5, 1, 0,
      ]);
    });
    it("Should scale to complete `frequency` loops per 1 of input.", () => {
      const sin4 = wave.sine(4);
      expectAll([0, 1 / 4 / 4, 1 / 2 / 4, 1 / 4, 5 / 4 / 4, -1 / 4 / 4])(
        sin4,
      ).toBeCloseTo([0.5, 1, 0.5, 0.5, 1, 0]);
    });
  });
  describe("cosine()", () => {
    it("Should generate a cosine wave with input scaled by 2π so every 1 of input is a full rotation", () => {
      const cos1 = wave.cosine(1);
      expectAll([0, 1 / 4, 1 / 2, 1, 5 / 4, -1 / 4])(cos1).toBeCloseTo([
        1, 0.5, 0, 1, 0.5, 0.5,
      ]);
    });
    it("Should scale to complete `frequency` loops per 1 of input.", () => {
      const cos4 = wave.cosine(4);
      expectAll([0, 1 / 4 / 4, 1 / 2 / 4, 1 / 4, 5 / 4 / 4, -1 / 4 / 4])(
        cos4,
      ).toBeCloseTo([1, 0.5, 0, 1, 0.5, 0.5]);
    });
  });
  describe("triangle()", () => {
    const tri05 = wave.triangle(0.5);
    const tri1 = wave.triangle(1);
    const tri2 = wave.triangle(2);
    it("should take a frequency and return a triangle wave that matches it", () => {
      expectAll([0, 0.25, 0.5, 0.75, 1.0])(tri1).toBeCloseTo([
        0, 0.5, 1, 0.5, 0,
      ]);
      expectAll([0, 0.125, 0.25, 0.5, 0.75, 1.0])(tri2).toBeCloseTo([
        0, 0.5, 1, 0, 1, 0,
      ]);
    });
    it("Should loop", () => {
      expectAll([1.1, 1.25, 1.5, 1.6, 2.0])(tri1).toBeCloseTo([
        0.2, 0.5, 1.0, 0.8, 0,
      ]);
    });
    it("At 0.5 frequency (half a triangle), it looks a lot like a normal linear function.", () => {
      expectAll([0, 0.01, 0.123, 0.25, 0.5, 0.75, 0.999, 1.0])(
        tri05,
      ).toMatchFunction(linear);
      expectAll([-0.1, 1.1])(tri05).toBeCloseTo([0.1, 0.9]);
    });
  });
  describe("sawtooth()", () => {
    it("Looks like a repeating linear function", () => {
      const saw2 = wave.sawtooth(2);
      expectAll([0, 0.25, 0.5, 0.75, 1, 1.25, -0.25])(saw2).toBeCloseTo([
        0, 0.5, 1, 0.5, 1, 0.5, 0.5,
      ]);
    });
  });

  describe("square()", () => {
    it("when the input is less than 0.5, it returns 0, otherwise, 1. Loops based on frequency.", () => {
      const square = wave.square(1);
      const square2 = wave.square(2);
      expectAll([0, 0.25, 0.5, 0.75, 1, 1.25, -0.2, -0.7])(square).toBeCloseTo([
        0, 0, 1, 1, 1, 0, 1, 0,
      ]);
      expectAll([0, 0.1, 0.25, 0.5, 0.51, 0.75])(square2).toBeCloseTo([
        0, 0, 1, 1, 0, 1,
      ]);
    });
  });
  describe("pulse()", () => {
    it("Similar to square but value change can happen at a different point.", () => {
      const pulse = wave.pulse(0.75)(1);
      expectAll([0, 0.25, 0.5, 0.75, 1, 1.25, -0.2, -0.3])(pulse).toBeCloseTo([
        0, 0, 0, 1, 1, 0, 1, 0,
      ]);
    });
  });
});
