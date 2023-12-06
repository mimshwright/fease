import { applyTo, map, reduce } from "ramda";
import { EasingFunction } from "./../types";

const lowest = (xs: readonly number[]) => reduce(Math.min, Infinity, xs);
const highest = (xs: readonly number[]) => reduce(Math.max, -Infinity, xs);

export const takeMin = (fs: readonly EasingFunction[]) => (x: number) =>
  lowest(map(applyTo(x))(fs));
export const takeMax = (fs: readonly EasingFunction[]) => (x: number) =>
  highest(map(applyTo(x))(fs));
