import { createEaseSet } from "../util";
import { bounce as bounceFactory } from "./../factory/bounce";

export const [bounceIn, bounceOut, bounceInOut, bounceOutIn] = createEaseSet(
  bounceFactory(2.5)(0.55),
  true,
);
