import { linear, cubic, quintic, cubicInOut } from "./../preset/exp";
import { sinWave } from "../preset/waveform";
import { EasingFunction } from "../types";

export const exampleFunctions: Record<string, EasingFunction> = {
  linear,
  cubic,
  cubicInOut,
  quintic,
  sinWave,
};

export const getFunctionName = (func: EasingFunction): string =>
  Object.entries(exampleFunctions).find(([_, value]) => value === func)?.[0] ||
  "linear";
