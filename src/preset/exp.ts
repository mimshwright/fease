import { easeInOut, easeMiddle, easeOut } from "./../decorator/ease";
import { EasingFunction } from "../types";
import { exp } from "../factory";
import { I } from "../util";

// Exponentials
export const linear: EasingFunction = I;
export const quad = exp(2);
export const cubic = exp(3);
export const cubicOut = easeOut(cubic);
export const cubicInOut = easeInOut(cubic);
export const cubicMiddle = easeMiddle(cubic);
export const quartic = exp(4);
export const quintic = exp(5);
export const sextic = exp(6);

// Aliases
export const quadIn = quad;
export const cubicIn = cubic;
export const quarticIn = quartic;
export const quinticIn = quintic;
export const sexticIn = sextic;
