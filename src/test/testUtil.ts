import { map, pipe, zip, __ } from "ramda";
import { Unary } from "../types";

const expectPairToBeCloseTo = ([result, output]: [number, number]): void =>
  expect(result).toBeCloseTo(output);

// Takes inputs and outputs and a function, then checks that each result of f(input) is close to the output.
export const expectAll =
  <A>(inputs: A[]) =>
  <B>(f: Unary<A, B>) => ({
    toEqual: (outputs: B[]) => expect(map(f, inputs)).toEqual(outputs),
    toBeCloseTo: (outputs: number[]) =>
      pipe(
        map(f as Unary<A, number>),
        zip(outputs),
        map(expectPairToBeCloseTo)
      )(inputs),
    toMatchFunction: (g: Unary<A, B>) =>
      expect(map(f, inputs)).toEqual(map(g, inputs)),
    toBeUnchanged: () => expect(map(f, inputs)).toEqual(inputs),
  });

export const defaultTestRange = [0, 0.25, 0.5, 1.0, 2.0, -1];
export const expectTestRange = expectAll(defaultTestRange);
