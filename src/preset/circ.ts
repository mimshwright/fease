import { circular as circFactory } from "../factory";
import { createEaseSet } from "../util";

export const [circIn, circOut, circInOut, circOutIn] = createEaseSet(
  circFactory()
);
