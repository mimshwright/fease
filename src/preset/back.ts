import { createEaseSet } from "./../util/easeUtil";
import { overshoot as backFactory } from "./../factory/overshoot";

export const [backIn, backOut, backInOut, backOutIn] = createEaseSet(
  backFactory(1),
  true
);
