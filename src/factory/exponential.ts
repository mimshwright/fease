import { ReturnsEasingFunction } from "../types";
import { addIndex, reduce } from "ramda";

export const exp: ReturnsEasingFunction<number> = (exponent) => (x) =>
  x ** exponent;

export const poly: ReturnsEasingFunction<number[]> = (coefficients) => (x) =>
  addIndex(reduce<number, number>)(
    (total, coefficient, exponent) => total + coefficient * x ** exponent,
    0,
  )(coefficients);
