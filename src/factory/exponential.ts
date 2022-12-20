import { ReturnsEasingFunction } from "../types";
import { addIndex, reduce } from "ramda";

export const exp: ReturnsEasingFunction<number> = (exp) => (x) => x ** exp;

export const poly: ReturnsEasingFunction<number[]> = (coefficients) => (x) =>
  addIndex(reduce<number, number>)(
    (total, coefficient, exponent) => total + coefficient * x ** exponent,
    0
  )(coefficients);
