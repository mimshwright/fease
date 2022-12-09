import { linear, cubic, sinWave } from "../preset";
import { EasingFunction } from "../types";

export const exampleFunctions: Record<string, EasingFunction> = {
  linear,
  cubic,
  sinWave,
};

export const getFunctionName = (func: EasingFunction): string =>
  Object.entries(exampleFunctions).find(([_, value]) => value === func)?.[0] ||
  "linear";
