import { linear, cubicIn, cubicInOut } from "./../preset/exp";
import { sinWave } from "../preset/waveform";
import { EasingFunction } from "../types";
import { FunctionExamples } from "./demoTypes";
import { getKeyForValue } from "./demoUtil";

export const defaultExampleFunctions: FunctionExamples = {
  linear,
  cubicIn,
  cubicInOut,
  sinWave,
};

export const getFunctionName = (functions: FunctionExamples) =>
  getKeyForValue<EasingFunction>(functions);
