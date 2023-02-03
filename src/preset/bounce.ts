import { easeInOut, easeMiddle, easeOut } from "../decorator/ease";
import { bounce as bounceFactory } from "./../factory/bounce";

export const bounceOut = bounceFactory(2.5)(0.55);
export const bounceIn = easeOut(bounceOut);
export const bounceInOut = easeInOut(bounceIn);
export const bounceOutIn = easeMiddle(bounceIn);
