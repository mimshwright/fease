import { curry, pipe } from "ramda";
import { cubicOut } from "./../preset/exp";
import { transitionWithControl } from "./../combinator/transition";
import { max, forceStart0AndEnd1 } from "./../decorator/limit";
import { sine } from "./wave";
import {
  Combinator2,
  EasingFunction,
  EasingFunctionDecorator,
} from "./../types";
import { constant } from "./constant";
import { easeOut, scaleX, scaleY, shiftY } from "../decorator";
import { exp } from "./exponential";

const rampUp = (speed: number) =>
  max(1)(scaleX(1 / (speed * 4))(cubicOut) as EasingFunction);
const dampening = (stiffness: number) => easeOut(exp(stiffness));
const makeSineWave =
  (frequency: number) =>
  (energy: number): EasingFunction =>
    (shiftY(1 - energy * 0.5) as EasingFunctionDecorator)(
      (scaleY(energy) as EasingFunctionDecorator)(sine(frequency)),
    );

const dampen =
  (stiffness: number) => (convergencePoint: number) => (f: EasingFunction) =>
    (transitionWithControl(dampening(stiffness)) as Combinator2)(f)(
      constant(convergencePoint),
    );

const rampUpWaveFromZero = (frequency: number) =>
  (transitionWithControl(rampUp(frequency)) as Combinator2)(constant(0));

export const elastic = curry(
  (frequency: number, energy: number, stiffness: number): EasingFunction =>
    pipe(
      // generate the wave
      () => makeSineWave(frequency)(energy),
      // use stiffness value to dampen the wave converging onto 1
      dampen(stiffness)(1),
      // Transition between starting point (0) and 1 based on the frequency of the wave
      rampUpWaveFromZero(frequency),
      forceStart0AndEnd1,
    )(),
);
