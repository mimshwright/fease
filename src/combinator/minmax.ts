import { applyTo, map, reduce } from "ramda";
import { EasingFunction } from "./../types";

const lowest = (xs: number[]) => reduce(Math.min, Infinity, xs);
const highest = (xs: number[]) => reduce(Math.max, -Infinity, xs);

export const takeMin = (fs: EasingFunction[]) => (x: number) =>
  lowest(map(applyTo(x))(fs));
export const takeMax = (fs: EasingFunction[]) => (x: number) =>
  highest(map(applyTo(x))(fs));
