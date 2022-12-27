import { always, gt, ifElse } from "ramda";

export const threshold = (thresholdPoint = 0.5) =>
  ifElse(gt(thresholdPoint), always(0), always(1));
