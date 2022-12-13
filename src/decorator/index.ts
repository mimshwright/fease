import { addExampleToSection, DemoSection } from "../types";
import * as preset from "../preset";

export const section: DemoSection = {
  title: "Decorators",
  description:
    "Decorators take an Easing Function, and often 1 or more additional parameters, as input and return a modified function.",
  examples: [],
};

const addExample = addExampleToSection(section);

// mirror f + reflectX(f)

// easeOut
// easeInOut
// easeMiddle

// switchN
// switch2
// sequence
// repeat
// oscillate

// stepped
// discrete (array)

// clamp
// clamp01
// forceEnd1
// forceStart0
// abs
// deflect / constrain

// addN
// add2
// mergeN (add + scaleY)
// merge2
// mult
// transition
// transitionWeighted

import * as shift from "./shift";
export * from "./shift";

addExample({
  f: shift.shiftX,
  title: "ShiftX",
  code: "decorator.shiftX(x)(f)",
  description:
    "Adds or subtracts from the input value of the function resulting in a shift on the X axis. Affects phase of waveforms.",
  parameters: [
    { label: "shift", min: -1, max: 1, defaultValue: 0.5 },
    {
      label: "Input Function",
      defaultValue: preset.cubic,
      includeInGraph: true,
    },
  ],
});

addExample({
  f: shift.shiftY,
  title: "ShiftY",
  code: "decorator.shiftY(y)(f)",
  description:
    "Adds or subtracts from the output value of the function resulting in a shift on the Y axis.",
  parameters: [
    { label: "shift", min: -1, max: 1, defaultValue: 0.5 },
    {
      label: "Input Function",
      defaultValue: preset.cubic,
      includeInGraph: true,
    },
  ],
});

// shiftXY

import * as scale from "./scale";
export * from "./scale";

addExample({
  f: scale.scaleX,
  title: "ScaleX",
  code: "decorator.scaleX(s)(f)",
  description:
    "Multiplies the input value of the function resulting in results scaled on the X axis. Affects frequency of waveforms.",
  parameters: [
    { label: "scale", min: -1, max: 3, defaultValue: 2 },
    {
      label: "Input Function",
      defaultValue: preset.cubic,
      includeInGraph: true,
    },
  ],
});

addExample({
  f: scale.scaleY,
  title: "ScaleY",
  code: "decorator.scaleY(s)(f)",
  description:
    "Multiplies the output values of the function resulting in results scaled on the Y axis.  Affects amplitude of waveforms.",
  parameters: [
    { label: "scale", min: -1, max: 3, defaultValue: 2 },
    {
      label: "Input Function",
      defaultValue: preset.cubic,
      includeInGraph: true,
    },
  ],
});

addExample({
  f: scale.scaleXY,
  title: "ScaleXY",
  code: "decorator.scaleXY(s)(f)",
  description:
    "Scales in the X and Y direction simultaneously. (Note: This is difficult to see on normal functions, but is more visible on a waveform.)",
  parameters: [
    { label: "scale", min: 0.1, max: 2, defaultValue: 0.2 },
    {
      label: "Input Function",
      defaultValue: preset.sinWave,
      includeInGraph: true,
    },
  ],
});

import * as reflect from "./reflect";
export * from "./reflect";

addExample({
  f: reflect.reflectX,
  title: "ReflectX",
  code: "decorator.reflectX(f)",
  description: "Flips the function horizontally.",
  parameters: [
    {
      label: "Input Function",
      defaultValue: preset.cubic,
      includeInGraph: true,
    },
  ],
});
addExample({
  f: reflect.reflectY,
  title: "ReflectY",
  code: "decorator.reflectY(f)",
  description: "Flips the function vertically.",
  parameters: [
    {
      label: "Input Function",
      defaultValue: preset.cubic,
      includeInGraph: true,
    },
  ],
});
addExample({
  f: reflect.reflectXY,
  title: "ReflectXY",
  code: "decorator.reflectXY(f)",
  description:
    "Flips the function both horizontally and vertically. Equivalent to making the function 'ease out'.",
  parameters: [
    {
      label: "Input Function",
      defaultValue: preset.cubic,
      includeInGraph: true,
    },
  ],
});
