import { cubicOut } from "./../preset/exp";
import { transitionWithControl } from "./../combinator/transition";
import { max, forceStart0AndEnd1 } from "./../decorator/limit";
import { sinusoid } from "./wave";
import { EasingFunction } from "./../types";
import { constant } from "./constant";
import { easeOut, scaleX, scaleY, shiftY } from "../decorator";
import { exp } from "./exponential";

const rampUp = (speed: number) => max(1)(scaleX(1 / (speed * 4))(cubicOut));
const dampening = (stiffness: number) => easeOut(exp(stiffness));
const sine = (frequency: number) => (energy: number) =>
  shiftY(1 - energy * 0.5)(scaleY(energy)(sinusoid(frequency)));

const dampen =
  (stiffness: number) => (convergencePiont: number) => (f: EasingFunction) =>
    transitionWithControl(dampening(stiffness))(f)(constant(convergencePiont));

const rampUpWaveFromZero = (frequency: number) =>
  transitionWithControl(rampUp(frequency))(constant(0));

export const elastic =
  (frequency: number) =>
  (energy: number) =>
  (stiffness: number): EasingFunction =>
    forceStart0AndEnd1(
      // Transition between starting point (0) and 1 based on the frequency of the wave
      rampUpWaveFromZero(frequency)(
        // use stiffness value to dampen the wave converging onto 1
        dampen(stiffness)(1)(
          // generate the wave
          sine(frequency)(energy)
        )
      )
    );
