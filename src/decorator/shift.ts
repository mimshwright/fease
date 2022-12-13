import { EasingFunction, EasingFunctionDecorator } from "../types";

// Todo: shift and scale simultaneously

export const shiftX =
  (offset: number): EasingFunctionDecorator =>
  (f: EasingFunction) =>
  (x: number) =>
    f(x - offset);

export const shiftY =
  (offset: number): EasingFunctionDecorator =>
  (f: EasingFunction) =>
  (x: number) =>
    f(x) + offset;
