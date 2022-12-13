import { shiftX } from "./decorator/shift";
import { EasingFunction } from "./types";
import { exp, sine } from "./factory";
import { I } from "./util";

// Exponentials
export const linear: EasingFunction = I;
export const quad = exp(2);
export const cubic = exp(3);
export const quartic = exp(4);
export const quintic = exp(5);
export const sextic = exp(6);

// Waveforms
export const sinWave = sine(1);
export const cosWave = shiftX(-0.25)(sine(1));
