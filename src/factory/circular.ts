import { EasingFunction } from "../types";

// TODO:
// Not sure if this is the correct move here.
// I'm basically making this circular path as a factory even though it's more of a preset and will only be used
// as a preset. Maybe I can just make it private.
export const circular = (): EasingFunction => (x) => 1 - Math.sqrt(1 - x * x);
