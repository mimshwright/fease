import { shiftX } from "../decorator/shift";
import { sinusoid, sawtooth, triangle } from "../factory/wave";

// Waveforms
export const sinWave = sinusoid(1);
export const cosWave = shiftX(-0.25)(sinusoid(1));
export const sawWave = sawtooth(1);
export const triWave = triangle(1);
