import { identity, always, o } from "ramda";
import { EasingFunction, ReturnsEasingFunction, Unary } from "../types";

export const I: EasingFunction = identity<number>;
export const K: ReturnsEasingFunction<number> = always<number>;

// like o but for pipe.
// p :: (a -> b) -> (b -> c) -> (a -> c)
export const p =
  <A, B>(f: Unary<A, B>) =>
  <C>(g: Unary<B, C>) =>
    o(g, f);
