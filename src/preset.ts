import { EasingFunction } from "./types";
import { exp, I } from "./factory";

export const linear: EasingFunction = I;
export const quad = exp(2);
export const cubic = exp(3);
export const quartic = exp(4);
export const quintic = exp(5);
export const sextic = exp(6);
