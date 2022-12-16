import { linear, cubicIn, cubicInOut } from "./../preset/exp";
import { sinWave } from "../preset/waveform";
import { EasingFunction } from "../types";
import { FunctionExamples } from "./demoTypes";

export const defaultExampleFunctions: FunctionExamples = {
  linear,
  cubicIn,
  cubicInOut,
  sinWave,
};

export const getFunctionName =
  (functions: FunctionExamples) =>
  (func: EasingFunction): string =>
    Object.entries(functions).find(([_, value]) => value === func)?.[0] ||
    "linear";
