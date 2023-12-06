/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-return-void */

import { expect } from "vitest";
import { map, pipe, zip, __ } from "ramda";
import { Unary } from "../types";

const expectPairToBeCloseTo = ([result, output]: readonly [
  number,
  number,
]): void => expect(result).toBeCloseTo(output);

// Takes inputs and outputs and a function, then checks that each result of f(input) is close to the output.
export const expectAll =
  <A>(inputs: readonly A[]) =>
  <B>(f: Unary<A, B>) => ({
    toEqual: (outputs: readonly B[]) => expect(map(f, inputs)).toEqual(outputs),
    toBeCloseTo: (outputs: readonly number[]) =>
      pipe(
        map(f as Unary<A, number>),
        zip(outputs),
        map(expectPairToBeCloseTo),
      )(inputs),
    toMatchFunction: (g: Unary<A, number>) =>
      map((x: A) => expect(f(x)).toBeCloseTo(g(x)))(inputs),
    toBeUnchanged: () => expect(map(f, inputs)).toEqual(inputs),
  });

export const defaultTestRange = [0, 0.25, 0.5, 1.0, 2.0, -1];
export const expectTestRange = expectAll(defaultTestRange);
