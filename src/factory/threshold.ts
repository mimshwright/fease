export const threshold =
  (thresholdPoint = 0.5) =>
  (x: number) =>
    x < thresholdPoint ? 0 : 1;
