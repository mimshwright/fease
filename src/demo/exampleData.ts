import * as fease from "../index";
import { sinWave } from "./../preset/waveform";
import { DemoCollection, DemoSection } from "./demoTypes";

import { EasingFunction } from "../types";

const doubleLinear = fease.scaleY(2.5)(fease.linear);
const bigSine = fease.shiftY(-0.5)(fease.scaleY(1.5)(fease.sinWave));
const bigCenteredSine = fease.shiftY(-0.25)(fease.scaleY(1.5)(sinWave));

const discreteOptions = {
  simple: [0, 0.2, 0.4, 0.6, 0.8, 1],
  spreadingZigZag: [0, 0.2, 0.1, 0.4, 0.2, 0.6, 0.3, 0.8, 0.4, 1.0],
  sin: fease.render(10)(fease.sinWave),
  wiggleStages: [
    0, 0.05, 0, 0.02, 0, 0.2, 0.25, 0.2, 0.22, 0.2, 0.4, 0.45, 0.4, 0.42, 0.4,
    0.6, 0.65, 0.6, 0.62, 0.6, 0.8, 0.85, 0.8, 0.82, 0.8, 1, 1, 1, 1, 1,
  ],
};
const oversizedOptions = {
  "big linear": doubleLinear,
  "big sine": bigCenteredSine,
  "shifted linear": fease.shiftY(0.3)(fease.linear),
};

const sections: Record<string, DemoSection> = {
  factory: {
    title: "Factories",
    description:
      "Factories are functions that create a new type of Easing Funciton. They may take 1 or more parameters.",
  },
  decorator: {
    title: "Decorators",
    description:
      "Decorators take an Easing Function, and often 1 or more additional parameters, as input and return a modified function.",
  },
  combinator: {
    title: "Combninator",
    description:
      "Combinators combine 2 or more easing functions to create, and often 1 or more additional parameters, as input and return a combined function.",
  },
  preset: {
    title: "Presets",
    description:
      "Commonly used easing functions that require no additional parameters. You'll find most of the well-known easing functions here.",
  },
  util: {
    title: "Utility",
    description:
      "Additional helper utilities for working with easing functions.",
  },
};

// By using the KeyTypeGuard, the demo is forced to create an example for each
// function exported by the library.
const exampleData: DemoCollection<typeof fease> = {
  sections,
  examples: {
    /////////////
    // FACTORY //
    /////////////
    threshold: {
      f: fease.threshold,
      section: "factory",
      subsection: "",
      title: "Threshold",
      code: "factory.threshold(breakpoint)",
      description:
        "Creates a function that returns 0 until the input value crosses a threshold then returns 1. For example, if the breakpoint is 0.5, the function will return 0 until x is >= 0.5, after that it will return 1.0",
      seeAlso: ["makeRepeatable", "square", "pulse"],
      parameters: [
        {
          label: "Breakpoint",
          min: 0,
          max: 1,
          step: 0.01,
          defaultValue: 0.5,
        },
      ],
    },
    exp: {
      f: fease.exp,
      section: "factory",
      subsection: "",
      title: "Exponential",
      code: "factory.exp(exponent)",
      description: "Creates an exponential function with a given exponent.",
      seeAlso: ["Polynomial"],
      parameters: [{ label: "exponent", min: -2, max: 6, defaultValue: 3 }],
    },
    poly: {
      f: (a: number) => (b: number) => (c: number) => (d: number) =>
        fease.poly([a, b, c, d]),
      section: "factory",
      subsection: "",
      title: "Polynomial",
      code: "factory.poly([c0,c1,...c(n-1)])",
      description:
        "Creates a polynomial equation using an array that represents the coefficients of each degree starting with x^0 up to x^n-1. For example, `poly([-8,6,-4,2])` would result in the equation `2x^2 - 4x^2 + 6x -8`",
      seeAlso: ["Exponential"],
      parameters: [
        {
          label: "x^0 coefficient",
          min: -2,
          max: 2,
          defaultValue: 0,
          step: 0.1,
        },
        {
          label: "x^1 coefficient",
          min: -2,
          max: 2,
          defaultValue: -0.5,
          step: 0.1,
        },
        {
          label: "x^2 coefficient",
          min: -2,
          max: 2,
          defaultValue: 1.2,
          step: 0.1,
        },
        {
          label: "x^3 coefficient",
          min: -2,
          max: 2,
          defaultValue: 0.3,
          step: 0.1,
        },
      ],
    },
    discrete: {
      f: fease.discrete,
      section: "factory",
      subsection: "discrete",
      title: "Discrete",
      code: "factory.discrete([a,b,c,...,n])",
      description:
        "Given a list of values, returns an easing function that returns those values based on the input to the function as a percentage of the list. Can be combined with util.render to create a function with a fixed number of steps.",
      parameters: [
        {
          label: "Output Values",
          defaultValue: discreteOptions.simple,
          options: discreteOptions,
        },
      ],
    },
    discreteBlend: {
      section: "factory",
      f: fease.discreteBlend,
      title: "DiscreteBlend",
      subsection: "discrete",
      code: "factory.discreteBlend([a,b,c,...,n])",
      description:
        "Similar to `factory.discrete` except interpolates the position between each value.",
      parameters: [
        {
          label: "Output Values",
          defaultValue: discreteOptions.simple,
          options: discreteOptions,
        },
      ],
    },
    sinusoid: {
      f: fease.sinusoid,
      section: "factory",
      subsection: "wave",
      title: "Sinusoid",
      code: "factory.sinusoid(freq)",
      description:
        "Creates a sine wave funciton with frequency as a number of in full oscillations between 0 and 1 input.",
      parameters: [{ label: "frequency", min: 0.25, max: 20, defaultValue: 1 }],
    },
    sawtooth: {
      f: fease.sawtooth,
      section: "factory",
      subsection: "wave",
      title: "Sawtooth",
      code: "factory.sawtooth(freq)",
      description:
        "Creates a sawtooth wave funciton with frequency as a number of in full oscillations between 0 and 1 input.",
      parameters: [{ label: "frequency", min: 0.25, max: 20, defaultValue: 2 }],
    },
    triangle: {
      f: fease.triangle,
      section: "factory",
      subsection: "wave",
      title: "Triangle",
      code: "factory.triangle(freq)",
      description:
        "Creates a triangle wave funciton with frequency as a number of in full oscillations between 0 and 1 input.",
      parameters: [{ label: "frequency", min: 0.25, max: 20, defaultValue: 2 }],
    },
    square: {
      f: fease.square,
      section: "factory",
      subsection: "wave",
      title: "Square",
      code: "factory.square(freq)",
      description:
        "Creates a square wave with frequency as a number of in full oscillations between 0 and 1 input.",
      seeAlso: ["makeRepeatable", "square", "pulse"],
      parameters: [{ label: "frequency", min: 0.25, max: 20, defaultValue: 2 }],
    },
    pulse: {
      f: fease.pulse,
      section: "factory",
      subsection: "wave",
      title: "Pulse",
      code: "factory.pulse(shape)(freq)",
      description:
        "Creates a pulse wave with an offset value for the shape of the wave and frequency as a number of in full oscillations between 0 and 1 input.",
      seeAlso: ["makeRepeatable", "square", "pulse"],
      parameters: [
        { label: "shape", min: 0.0, max: 1, step: 0.01, defaultValue: 0.7 },
        { label: "frequency", min: 0.25, max: 20, defaultValue: 2 },
      ],
    },

    ///////////////
    // DECORATOR //
    ///////////////
    min: {
      f: fease.min,
      section: "decorator",
      subsection: "limit",
      title: "Min",
      code: "min(n)(f)",
      description: "Sets a minimum output value for the function.",
      parameters: [
        { label: "lo", defaultValue: 0.2, min: -0.5, max: 1.5, step: 0.05 },
        {
          label: "Input Function",
          defaultValue: fease.cubicIn,
          includeInGraph: true,
        },
      ],
    },
    max: {
      f: fease.max,
      section: "decorator",
      subsection: "limit",
      title: "Max",
      code: "max(hi)(f)",
      description: "Sets a maximum output value for the function.",
      parameters: [
        { label: "hi", defaultValue: 0.7, min: -0.5, max: 1.5, step: 0.05 },
        {
          label: "Input Function",
          defaultValue: fease.cubicIn,
          includeInGraph: true,
        },
      ],
    },
    clamp: {
      f: fease.clamp,
      section: "decorator",
      subsection: "limit",
      title: "Clamp",
      code: "clamp(lo)(hi)(f)",
      description: "Sets a minimum and maximum output value for the function.",
      parameters: [
        { label: "low", defaultValue: 0.1, min: -0.5, max: 1.5, step: 0.05 },
        {
          label: "high",
          defaultValue: 0.9,
          min: -0.5,
          max: 1.5,
          step: 0.05,
        },
        {
          label: "Input Function",
          defaultValue: fease.sinWave,
          includeInGraph: true,
        },
      ],
    },
    clamp01: {
      f: fease.clamp01,
      section: "decorator",
      subsection: "limit",
      title: "Clamp01",
      code: "clamp(f)",
      description:
        "Same as clamp but automatically applies 0 and 1 as the range.",
      parameters: [
        {
          label: "Input Function",
          defaultValue: oversizedOptions["big linear"],
          options: oversizedOptions,
          includeInGraph: true,
        },
      ],
    },
    forceStart0: {
      f: fease.forceStart0,
      section: "decorator",
      subsection: "limit",
      code: "forceStart0(f)",
      title: "ForceStart0",
      description:
        "Ensures that the function will return 0 if the input value is 0 or less.",
      parameters: [
        {
          label: "Input Function",
          defaultValue: fease.sinWave,
          options: { sinWave: fease.sinWave },
        },
      ],
    },
    forceEnd1: {
      f: fease.forceEnd1,
      section: "decorator",
      subsection: "limit",
      code: "forceEnd1(f)",
      title: "ForceEnd1",
      description:
        "Ensures that the function will return 1 if the input value is 1 or more.",
      parameters: [
        {
          label: "Input Function",
          defaultValue: fease.sinWave,
          options: { sinWave: fease.sinWave },
        },
      ],
    },
    forceStart0AndEnd1: {
      f: fease.forceStart0AndEnd1,
      section: "decorator",
      subsection: "limit",
      code: "forceStart0AndEnd1(f)",
      title: "ForceStart0AndEnd1",
      description: "Combines both forceStart0 and forceEnd1.",
      parameters: [
        {
          label: "Input Function",
          defaultValue: fease.sinWave,
          options: { sinWave: fease.sinWave },
        },
      ],
    },
    abs: {
      f: fease.abs,
      section: "decorator",
      subsection: "limit",
      title: "Absolute",
      code: "deocrator.abs(f)",
      description:
        "Any negative values produced by the function lose their negative sign.",
      parameters: [
        {
          label: "Input Function",
          defaultValue: bigSine,
          options: {
            "sine - scaleY: 1.5, shiftY: -0.5": bigSine,
          },
          includeInGraph: true,
        },
      ],
    },
    constrain: {
      f: fease.constrain,
      section: "decorator",
      subsection: "limit",
      title: "Constrain",
      code: "deocrator.constrain(low)(high)(f)",
      description:
        "Any negative values produced by the function lose their negative sign.",
      parameters: [
        { label: "low", min: -1, max: 1, defaultValue: 0.1, step: 0.05 },
        { label: "high", min: -1, max: 1, defaultValue: 0.9, step: 0.05 },
        {
          label: "Input Function",
          defaultValue: bigCenteredSine,
          options: {
            "linear - scaleY: 2.5": doubleLinear,
            "sine - scaleY: 1.5, shiftY: -0.25": bigCenteredSine,
          },
          includeInGraph: true,
        },
      ],
    },
    constrain01: {
      f: fease.constrain01,
      section: "decorator",
      subsection: "limit",
      title: "Constrain01",
      code: "deocrator.constrain01(f)",
      description:
        "Same as constrain but automatically applies 0 and 1 as the range.",
      parameters: [
        {
          label: "Input Function",
          defaultValue: bigCenteredSine,
          options: {
            "linear - scaleY: 2.5": doubleLinear,
            "sine - scaleY: 1.5, shiftY: -0.25": bigCenteredSine,
          },
          includeInGraph: true,
        },
      ],
    },
    stepped: {
      f: fease.stepped,
      section: "decorator",
      subsection: "stepped",
      title: "Stepped",
      code: "decorator.stepped(steps)(f)",
      description:
        "Converts the function into one that returns a fixed number of discrete values resulting in a stair-step pattern. The resulting animation is jerky as if there were a low framerate.",
      parameters: [
        {
          label: "steps",
          min: 2,
          max: 50,
          defaultValue: 10,
          step: 1,
        },
        {
          label: "Input Function",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
      ],
    },

    shiftX: {
      f: fease.shiftX,
      section: "decorator",
      subsection: "shift & scale",
      title: "ShiftX",
      code: "decorator.shiftX(x)(f)",
      description:
        "Adds or subtracts from the input value of the function resulting in a shift on the X axis. Affects phase of waveforms.",
      parameters: [
        { label: "shift", min: -1, max: 1, defaultValue: 0.5 },
        {
          label: "Input Function",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
      ],
    },

    shiftY: {
      f: fease.shiftY,
      title: "ShiftY",
      section: "decorator",
      subsection: "shift & scale",
      code: "decorator.shiftY(y)(f)",
      description:
        "Adds or subtracts from the output value of the function resulting in a shift on the Y axis.",
      parameters: [
        { label: "shift", min: -1, max: 1, defaultValue: 0.5 },
        {
          label: "Input Function",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
      ],
    },

    scaleX: {
      f: fease.scaleX,
      title: "ScaleX",
      section: "decorator",
      subsection: "shift & scale",
      code: "decorator.scaleX(s)(f)",
      description:
        "Multiplies the input value of the function resulting in results scaled on the X axis. Affects frequency of waveforms.",
      parameters: [
        { label: "scale", min: -1, max: 3, defaultValue: 2 },
        {
          label: "Input Function",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
      ],
    },

    scaleY: {
      f: fease.scaleY,
      title: "ScaleY",
      section: "decorator",
      subsection: "shift & scale",
      code: "decorator.scaleY(s)(f)",
      description:
        "Multiplies the output values of the function resulting in results scaled on the Y axis.  Affects amplitude of waveforms.",
      parameters: [
        { label: "scale", min: -1, max: 3, defaultValue: 2 },
        {
          label: "Input Function",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
      ],
    },

    scaleXY: {
      f: fease.scaleXY,
      title: "ScaleXY",
      section: "decorator",
      subsection: "shift & scale",
      code: "decorator.scaleXY(s)(f)",
      description:
        "Scales in the X and Y direction simultaneously. (Note: This is difficult to see on normal functions, but is more visible on a waveform.)",
      parameters: [
        { label: "scale", min: 0.1, max: 2, defaultValue: 0.2 },
        {
          label: "Input Function",
          defaultValue: fease.sinWave,
          includeInGraph: true,
          options: {
            sineWave: fease.sinWave,
            cosWave: fease.cosWave,
            sawWave: fease.sawWave,
          },
        },
      ],
    },

    reflectX: {
      f: fease.reflectX,
      title: "ReflectX",
      section: "decorator",
      subsection: "reflect",
      code: "decorator.reflectX(f)",
      description: "Flips the function horizontally.",
      parameters: [
        {
          label: "Input Function",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
      ],
    },
    reflectY: {
      f: fease.reflectY,
      title: "ReflectY",
      section: "decorator",
      subsection: "reflect",
      code: "decorator.reflectY(f)",
      description: "Flips the function vertically.",
      parameters: [
        {
          label: "Input Function",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
      ],
    },
    reflectXY: {
      f: fease.reflectXY,
      title: "ReflectXY",
      section: "decorator",
      subsection: "reflect",
      code: "decorator.reflectXY(f)",
      description:
        "Flips the function both horizontally and vertically. Equivalent to rotating the graph 180°.",
      seeAlso: ["easeOut"],
      parameters: [
        {
          label: "Input Function",
          defaultValue: fease.cubicIn,
          includeInGraph: true,
          options: {
            cubicOut: fease.cubicOut,
            cubicMiddle: fease.cubicMiddle,
          },
        },
      ],
    },
    mirror: {
      f: fease.mirror,
      title: "Mirror",
      section: "decorator",
      subsection: "reflect",
      code: "decorator.mirror(f)",
      description:
        "Takes a function and creates a mirror image where the right half of the function is a reflection of the left side. The function should play once going forward and once going backward.",
      parameters: [
        {
          label: "Input Function",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
      ],
    },
    repeat: {
      f: fease.repeat,
      title: "Repeat",
      section: "decorator",
      subsection: "repeat",
      code: "decorator.repeat(times)(f)",
      description:
        "Creates a function that repeats another function n times within the span of the fuction.",
      parameters: [
        { label: "times", defaultValue: 5, min: 1, max: 10, step: 1 },
        {
          label: "Input Function",
          defaultValue: fease.linear,
          includeInGraph: false,
        },
      ],
    },
    repeatSequence: {
      f: fease.repeatSequence,
      title: "RepeatSequence",
      section: "decorator",
      subsection: "repeat",
      code: "decorator.repeatSequence(times)(f)",
      description:
        "Creates a function that repeats another function n times within the span of the fuction but each one will be played one after the next.",
      parameters: [
        { label: "times", defaultValue: 5, min: 1, max: 10, step: 1 },
        {
          label: "Input Function",
          defaultValue: fease.cubic,
          includeInGraph: false,
        },
      ],
    },
    easeOut: {
      f: fease.easeOut,
      title: "EaseOut",
      section: "decorator",
      subsection: "ease",
      code: "decorator.easeOut(f)",
      description:
        "Takes a function that normally starts slow and ends fast (ease in) and returns a function that starts fast and ends slow (ease out).",
      parameters: [
        {
          label: "Input Function",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
      ],
    },
    easeInOut: {
      f: fease.easeInOut,
      title: "EaseInOut",
      section: "decorator",
      subsection: "ease",
      code: "decorator.easeInOut(f)",
      description:
        "Takes a function that normally starts slow and ends fast (ease in) and returns a function that starts slow, goes fast, and ends slow (ease in out). In actuality, the function is composed using `sequence` and `reflectXY` so the results are unpredictable if you use a non-easeIn function as an input.",
      parameters: [
        {
          label: "Input Function",
          defaultValue: fease.cubic,
          includeInGraph: true,
          options: {
            quadIn: fease.quadIn,
            cubicIn: fease.cubicIn,
            cubicOut: fease.cubicOut,
          },
        },
      ],
    },
    easeOutIn: {
      f: fease.easeOutIn,
      title: "EaseOutIn",
      section: "decorator",
      subsection: "ease",
      code: "decorator.easeOutIn(f)",
      description:
        "Takes a function that normally starts slow and ends fast (ease in) and returns a function that starts fast, goes slow, and ends fast (ease out in / ease middle).",
      parameters: [
        {
          label: "Input Function",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
      ],
    },
    easeMiddle: {
      f: fease.easeMiddle,
      title: "EaseMiddle",
      section: "decorator",
      subsection: "ease",
      code: "decorator.easeMiddle(f)",
      exampleType: "hidden",
    },
    wavify: {
      f: fease.wavify,
      title: "wavify",
      section: "decorator",
      subsection: "wavify",
      code: "decorator.wavify(f)",
      description:
        "Turns a function into a repeating waveform with a number for frequency for how many times it should repeat between the input values of 0 and 1.",
      parameters: [
        {
          label: "Frequency",
          defaultValue: 1,
          min: 0.2,
          max: 10,
          step: 0.1,
        },
        {
          label: "Input Function",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
      ],
    },

    ////////////////
    // COMBINATOR //
    ////////////////
    split: {
      f: fease.split,
      title: "Split",
      section: "combinator",
      subsection: "split",
      code: "decorator.split(f)(g)",
      description:
        "Takes two functions, f and g, and returns an easing fucntion that splits the function into two parts using `f` for the first part and `g` for the second.",
      parameters: [
        {
          label: "Input Function 1",
          defaultValue: fease.sinWave,
          includeInGraph: true,
        },
        {
          label: "Input Function 2",
          defaultValue: fease.linear,
          includeInGraph: true,
        },
      ],
    },
    splitN: {
      f: (f: EasingFunction) => (g: EasingFunction) => (h: EasingFunction) =>
        fease.splitN([f, g, h]),
      title: "SplitN",
      section: "combinator",
      subsection: "split",
      code: "decorator.splitn([f,g,h])",
      description:
        "Takes an array of multiple functions, f and g, and returns an easing fucntion that is split into n parts, switching between the functions evenly.",
      parameters: [
        {
          label: "Input Function 1",
          defaultValue: fease.sinWave,
          includeInGraph: true,
        },
        {
          label: "Input Function 2",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
        {
          label: "Input Function 3",
          defaultValue: fease.linear,
          includeInGraph: true,
        },
      ],
    },
    splitScale: {
      f: (f: EasingFunction) => (g: EasingFunction) => (h: EasingFunction) =>
        fease.splitScale([f, g, h]),
      title: "SplitScale",
      section: "combinator",
      subsection: "split",
      code: "decorator.splitScale([f,g,h])",
      description:
        "Same as splitN() except splitScale also scales each function so that it fits within its alloted space.",
      parameters: [
        {
          label: "Input Function 1",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
        {
          label: "Input Function 2",
          defaultValue: fease.linear,
          includeInGraph: true,
        },
        {
          label: "Input Function 3",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
      ],
    },
    sequence: {
      f: (f: EasingFunction) => (g: EasingFunction) => (h: EasingFunction) =>
        fease.sequence([f, g, h]),
      section: "combinator",
      subsection: "split",
      title: "Sequence",
      code: "decorator.sequence([f,g,h])",
      description:
        "Same as splitScale() except sequence scales each function to start at the end of the last one.",
      parameters: [
        {
          label: "Input Function 1",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
        {
          label: "Input Function 2",
          defaultValue: fease.linear,
          includeInGraph: true,
        },
        {
          label: "Input Function 3",
          defaultValue: fease.cubic,
          includeInGraph: true,
        },
      ],
    },
    ////////////
    // Preset //
    ////////////
    linear: {
      f: fease.linear,
      section: "preset",
      subsection: "polynomial",
      title: "Linear",
      code: "preset.linear()",
      description: "TBD",
    },
    quadIn: {
      f: fease.quadIn,
      section: "preset",
      subsection: "polynomial",
      title: "Quadratic",
      code: "preset.quadIn()",
      description: "TBD",
      seeAlso: ["Exponential"],
    },
    cubicIn: {
      f: fease.cubicIn,
      section: "preset",
      subsection: "polynomial",
      exampleType: "hidden",
      title: "CubicIn",
      code: "",
      description: "alias of cubic",
    },
    cubicOut: {
      f: fease.cubicOut,
      section: "preset",
      subsection: "polynomial",
      title: "CubicOut",
      code: "preset.cubicOut()",
      description: "TBD",
    },
    cubicInOut: {
      f: fease.cubicInOut,
      section: "preset",
      subsection: "polynomial",
      title: "CubicInOut",
      code: "preset.cubicInOut()",
      description: "TBD",
      seeAlso: ["Exponential"],
    },
    cubicMiddle: {
      f: fease.cubicMiddle,
      section: "preset",
      subsection: "polynomial",
      title: "CubicMiddle",
      code: "preset.cubicMiddle()",
      description: "TBD",
      seeAlso: ["Exponential"],
    },
    quarticIn: {
      f: fease.quarticIn,
      section: "preset",
      subsection: "polynomial",
      title: "QuarticIn",
      code: "preset.quarticIn()",
      description: "TBD",
      seeAlso: ["Exponential"],
    },
    quinticIn: {
      f: fease.quinticIn,
      section: "preset",
      subsection: "polynomial",
      title: "QuinticIn",
      code: "preset.quinticIn()",
      description: "TBD",
      seeAlso: ["Exponential"],
    },
    sexticIn: {
      f: fease.sexticIn,
      section: "preset",
      subsection: "polynomial",
      title: "SexticIn",
      code: "preset.sexticIn()",
      description: "TBD",
      seeAlso: ["Exponential"],
    },

    // hidden

    quad: {
      f: fease.quad,
      section: "preset",
      subsection: "polynomial",
      exampleType: "hidden",
      title: "Quadratic",
      code: "preset.quad()",
      description: "TBD",
      seeAlso: ["Exponential"],
    },
    cubic: {
      f: fease.cubic,
      section: "preset",
      subsection: "polynomial",
      exampleType: "hidden",
      title: "Cubic",
      code: "preset.cubic()",
      description: "TBD",
      seeAlso: ["Exponential"],
      // aliases: ["cubicIn"],
    },
    quartic: {
      f: fease.quartic,
      section: "preset",
      subsection: "polynomial",
      exampleType: "hidden",
      title: "Quartic",
      code: "preset.quartic()",
      description: "TBD",
      seeAlso: ["Exponential"],
    },
    quintic: {
      f: fease.quintic,
      section: "preset",
      subsection: "polynomial",
      exampleType: "hidden",
      title: "Quintic",
      code: "preset.quintic()",
      description: "TBD",
      seeAlso: ["Exponential"],
    },
    sextic: {
      f: fease.sextic,
      section: "preset",
      subsection: "polynomial",
      exampleType: "hidden",
      title: "Sextic",
      code: "preset.sextic()",
      description: "TBD",
      seeAlso: ["Exponential"],
    },

    /// waves

    sinWave: {
      f: fease.sinWave,
      section: "preset",
      subsection: "wave",
      title: "Sine Wave",
      code: "preset.sinWave()",
      description: "TBD",
    },

    cosWave: {
      f: fease.cosWave,
      section: "preset",
      subsection: "wave",
      title: "Cosine Wave",
      code: "preset.cosWave()",
      description: "(cos is identical to sin but the phase is +25%)",
      seeAlso: ["ShiftX"],
    },

    sawWave: {
      f: fease.sawWave,
      section: "preset",
      subsection: "wave",
      title: "Sawtooth Wave",
      code: "preset.sawWave()",
      description: "TBD",
      seeAlso: ["repeat", "linear"],
    },
    triWave: {
      f: fease.triWave,
      section: "preset",
      subsection: "wave",
      title: "Triangle Wave",
      code: "preset.triWave()",
      description: "TBD",
      seeAlso: ["repeat", "linear", "mirror", "wavify"],
    },
    render: {
      f: fease.render,
      section: "util",
      subsection: "easing",
      title: "Render",
      code: "util.render(steps)(f)",
      exampleType: "text",
      exampleText: `const linearResults = util.render(11)(preset.linear);
// [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]

const sineResults = util.render(5)(preset.sinWave);
// [0.5, 1.0, 0.5, 0.0, 0.5]
`,
      description:
        "Takes a number of steps and a function. Generates a range of input values based on steps from 0 to 1 then maps the function over those values to get an array of results. Regardless of steps, the input always includes at least 2 values, [0, 1].",
    },

    /////////////
    // UTILITY //
    /////////////
    p: {
      f: fease.p,
      section: "util",
      subsection: "functional",
      title: "P",
      code: "util.p(f)(g)",
      exampleType: "text",
      exampleText: `const add1 = x => x + 1;
const add1ToFunctionResult = util.p(add1);
const sum = nums => nums.reduce((sum, n) => sum + n, 0);
const sumPlus1 = add1ToFunctionResult(sum);
sumPlus1([1,2,3]); // 7
`,
      description:
        "Like ramda's `o` function but with the order reversed. o is to compose as p is to pipe",
    },
    //     constrain: {
    //       f: fease.constrain,
    //       title: "Constrain",
    //       code: "util.constrain(low)(high)(x)",
    //       exampleType: "text",
    //       exampleText: `const constrain01 = constrain(0)(1);
    // constrian01(0); // 0
    // constrain01(0.5); // 0.5
    // constrian01(1.0); // 1.0
    // constrian01(1.25); // 0.75 // starts to reflect back towards 0
    // constrian01(1.90); // 0.10
    // constrian01(2.30); // 0.30 // hits 0 and goes back up towards 1
    // constrain01(-0.25); // 0.25 // going below 0 brings it back up
    // constrain01(-1.0); // 1.0
    // constrain01(-1.25); // 0.75 // if it goes past the high point again, starts going down again.
    // `,
    //       description:
    //         "Can be used to 'wrap' a function around the output of another function. Takes functions f and g and returns a new function h with the same parameters as g. Calling h will apply f to the result of calling g.",
    //     },
    I: {
      f: fease.I,
      title: "I Combinator",
      section: "util",
      subsection: "functional",
      code: "util.I(x)",
      exampleType: "hidden",
      description:
        "I combinator. AKA Idiot, Identity. Simply returns the argument passed to it. Used to create a simple `linear` function.",
    },
    K: {
      f: fease.K,
      section: "util",
      subsection: "functional",
      title: "K Combinator",
      code: "util.K(x)",
      exampleType: "hidden",
      description:
        "K combinator. AKA Kestrel, Constant, Always. Takes a value and returns a function that always returns that value. Used to create a simple `constant` function.",
    },
  },
};

export default exampleData;
