import { shiftX } from "../decorator/shift";
import { sine } from "../factory";

// Waveforms
export const sinWave = sine(1);
export const cosWave = shiftX(-0.25)(sine(1));
