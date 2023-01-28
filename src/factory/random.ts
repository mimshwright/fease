import RNG from "alea";
import { memoizeWith, toString } from "ramda";
import { forceStart0AndEnd1 } from "../decorator";
import { render } from "../util";
import { discreteBlend } from "./discrete";

const createRNG = (seed = Math.random()) => {
  const rng = RNG(seed);
  return (_x: number) => rng();
};

export const random = (seed?: number) => forceStart0AndEnd1(createRNG(seed));

export const fixedRandom = (seed?: number) =>
  memoizeWith(toString, random(seed));

export const smoothRandom = (seed?: number) => (steps: number) =>
  discreteBlend(render(steps)(fixedRandom(seed)));
