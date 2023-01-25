import { easeInOut, easeOut, easeOutIn } from "../decorator";
import { circular } from "../factory";

export const circ = circular();
export const circOut = easeOut(circ);
export const circInOut = easeInOut(circ);
export const circOutIn = easeOutIn(circ);
