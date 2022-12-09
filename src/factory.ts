import { addExampleToSection, ReturnsEasingFunction } from "./types";
import { addIndex, reduce } from "ramda";
import { scaleXY, shiftX } from "./decorator";

export const section = {
  title: "Generators",
  description:
    "Generators are functions that create a new type of Easing Funciton. They may take 1 or more parameters.",
  examples: [],
};

const addExample = addExampleToSection(section);

// linear
// constant
// threshhold
// sin
// cos
// tan
// triangle
// sawtooth
// square
// pulse
// random
// circle
// physics?

export const exp: ReturnsEasingFunction<number> = (exp) => (x) => x ** exp;
addExample({
  f: exp,
  title: "Exponential",
  code: "generator.exp(exponent)",
  description: "Creates an exponential function with a given exponent.",
  parameters: [{ label: "exponent", min: -2, max: 6, defaultValue: 3 }],
});

export const poly: ReturnsEasingFunction<number[]> = (coefficients) => (x) =>
  addIndex(reduce<number, number>)(
    (total, coefficient, exponent) => total + coefficient * x ** exponent,
    0
  )(coefficients);
addExample({
  f: scaleXY(0.42)(shiftX(0.9)(poly([2, -1, -2, 2]))),
  title: "Polynomial",
  code: "generator.poly([c0,c1,...c(n-1)])",
  description:
    "Creates a polynomial equation using an array that represents the coefficients of each degree starting with x^0 up to x^n-1. For example, `poly([-8,6,-4,2])` would result in the equation `2x^2 - 4x^2 + 6x -8`",
});

const FULL_ROTATION_IN_RADIANS = Math.PI * 2;
export const sine: ReturnsEasingFunction<number> =
  (frequency = 1) =>
  (x: number) =>
    Math.sin(x * frequency * FULL_ROTATION_IN_RADIANS) / 2 + 0.5;
addExample({
  f: sine,
  title: "Sine",
  code: "generator.sine(freq)",
  description:
    "Creates a sine wave funciton with frequency a number of in full oscillations between 0 and 1 input.",
  parameters: [{ label: "frequency", min: 0.01, max: 20, defaultValue: 1 }],
});

// export const cosine: ReturnsEasingFunction<number> = shiftX(-0.25)(sine);
