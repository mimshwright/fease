import { shiftX } from "../decorator/shift";
import { sine, saw } from "../factory";

// Waveforms
export const sinWave = sine(1);
export const cosWave = shiftX(-0.25)(sine(1));
export const sawWave = saw(1);
