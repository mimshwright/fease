import { elastic } from "./elastic";

export const overshoot = (magnitude: number) => elastic(0.5)(magnitude)(1.5);
