import { easeInOut, easeMiddle, easeOut } from "../decorator/ease";
import { overshoot as backFactory } from "./../factory/overshoot";

export const backOut = backFactory(1);
export const backIn = easeOut(backOut);
export const backInOut = easeInOut(backIn);
export const backOutIn = easeMiddle(backIn);
