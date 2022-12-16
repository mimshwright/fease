import { DemoSection } from "./demoTypes";

import * as preset from "../preset";
import * as factory from "../factory";
import * as decorator from "../decorator";
import * as util from "../util";
import { EasingFunction } from "../types";

// By using the KeyTypeGuard, the demo is forced to create an example for each
// function exported by the library.
const exampleData: [
  DemoSection<typeof preset>,
  DemoSection<typeof factory>,
  DemoSection<typeof decorator>,
  DemoSection<typeof util>
] = [
  {
    title: "Presets",
    description:
      "Commonly used easing functions that require no additional parameters. You'll find most of the well-known easing functions here.",
    examples: {
      linear: {
        f: preset.linear,
        title: "Linear",
        code: "preset.linear()",
        description: "TBD",
      },
      quadIn: {
        f: preset.quadIn,
        title: "Quadratic",
        code: "preset.quadIn()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },
      cubicIn: {
        f: preset.cubicIn,
        exampleType: "hidden",
        title: "CubicIn",
        code: "",
        description: "alias of cubic",
      },
      cubicOut: {
        f: preset.cubicOut,
        title: "CubicOut",
        code: "preset.cubicOut()",
        description: "TBD",
      },
      cubicInOut: {
        f: preset.cubicInOut,
        title: "CubicInOut",
        code: "preset.cubicInOut()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },
      cubicMiddle: {
        f: preset.cubicMiddle,
        title: "CubicMiddle",
        code: "preset.cubicMiddle()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },
      quarticIn: {
        f: preset.quarticIn,
        title: "QuarticIn",
        code: "preset.quarticIn()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },
      quinticIn: {
        f: preset.quinticIn,
        title: "QuinticIn",
        code: "preset.quinticIn()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },
      sexticIn: {
        f: preset.sexticIn,
        title: "SexticIn",
        code: "preset.sexticIn()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },

      // hidden

      quad: {
        f: preset.quad,
        exampleType: "hidden",
        title: "Quadratic",
        code: "preset.quad()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },
      cubic: {
        f: preset.cubic,
        exampleType: "hidden",
        title: "Cubic",
        code: "preset.cubic()",
        description: "TBD",
        seeAlso: ["Exponential"],
        // aliases: ["cubicIn"],
      },
      quartic: {
        f: preset.quartic,
        exampleType: "hidden",
        title: "Quartic",
        code: "preset.quartic()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },
      quintic: {
        f: preset.quintic,
        exampleType: "hidden",
        title: "Quintic",
        code: "preset.quintic()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },
      sextic: {
        f: preset.sextic,
        exampleType: "hidden",
        title: "Sextic",
        code: "preset.sextic()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },

      /// waves

      sinWave: {
        f: preset.sinWave,
        title: "Sine Wave",
        code: "preset.sinWave()",
        description: "TBD",
      },

      cosWave: {
        f: preset.cosWave,
        title: "Cosine Wave",
        code: "preset.cosWave()",
        description: "(cos is identical to sin but the phase is +25%)",
        seeAlso: ["ShiftX"],
      },

      sawWave: {
        f: preset.sawWave,
        title: "Sawtooth Wave",
        code: "preset.sawWave()",
        description: "TBD",
        seeAlso: ["repeat", "linear"],
      },
    },
  },
  {
    title: "Factories",
    description:
      "Factories are functions that create a new type of Easing Funciton. They may take 1 or more parameters.",
    examples: {
      exp: {
        f: factory.exp,
        title: "Exponential",
        code: "factory.exp(exponent)",
        description: "Creates an exponential function with a given exponent.",
        seeAlso: ["Polynomial"],
        parameters: [{ label: "exponent", min: -2, max: 6, defaultValue: 3 }],
      },
      poly: {
        f: factory.poly([2, -1, -2, 2]),
        title: "Polynomial",
        code: "factory.poly([c0,c1,...c(n-1)])",
        description:
          "Creates a polynomial equation using an array that represents the coefficients of each degree starting with x^0 up to x^n-1. For example, `poly([-8,6,-4,2])` would result in the equation `2x^2 - 4x^2 + 6x -8`",
        seeAlso: ["Exponential"],
      },
      sine: {
        f: factory.sine,
        title: "Sine",
        code: "factory.sine(freq)",
        description:
          "Creates a sine wave funciton with frequency as a number of in full oscillations between 0 and 1 input.",
        parameters: [
          { label: "frequency", min: 0.25, max: 20, defaultValue: 1 },
        ],
      },
      saw: {
        f: factory.saw,
        title: "Saw",
        code: "factory.saw(freq)",
        description:
          "Creates a sawtooth wave funciton with frequency as a number of in full oscillations between 0 and 1 input.",
        parameters: [
          { label: "frequency", min: 0.25, max: 20, defaultValue: 2 },
        ],
      },
    },
  },
  {
    title: "Decorators",
    description:
      "Decorators take an Easing Function, and often 1 or more additional parameters, as input and return a modified function.",
    examples: {
      shiftX: {
        f: decorator.shiftX,
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
      },

      shiftY: {
        f: decorator.shiftY,
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
      },

      scaleX: {
        f: decorator.scaleX,
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
      },

      scaleY: {
        f: decorator.scaleY,
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
      },

      scaleXY: {
        f: decorator.scaleXY,
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
            options: {
              sineWave: preset.sinWave,
              cosWave: preset.cosWave,
              sawWave: preset.sawWave,
            },
          },
        ],
      },

      reflectX: {
        f: decorator.reflectX,
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
      },
      reflectY: {
        f: decorator.reflectY,
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
      },
      reflectXY: {
        f: decorator.reflectXY,
        title: "ReflectXY",
        code: "decorator.reflectXY(f)",
        description:
          "Flips the function both horizontally and vertically. Equivalent to rotating the graph 180°.",
        seeAlso: ["easeOut"],
        parameters: [
          {
            label: "Input Function",
            defaultValue: preset.cubicIn,
            includeInGraph: true,
            options: {
              cubicOut: preset.cubicOut,
              cubicMiddle: preset.cubicMiddle,
            },
          },
        ],
      },
      split: {
        f: decorator.split,
        title: "Split",
        code: "decorator.split(f)(g)",
        description:
          "Takes two functions, f and g, and returns an easing fucntion that splits the function into two parts using `f` for the first part and `g` for the second.",
        parameters: [
          {
            label: "Input Function 1",
            defaultValue: preset.sinWave,
            includeInGraph: true,
          },
          {
            label: "Input Function 2",
            defaultValue: preset.linear,
            includeInGraph: true,
          },
        ],
      },
      splitN: {
        f: (f: EasingFunction) => (g: EasingFunction) => (h: EasingFunction) =>
          decorator.splitN([f, g, h]),
        title: "SplitN",
        code: "decorator.splitn([f,g,h])",
        description:
          "Takes an array of multiple functions, f and g, and returns an easing fucntion that is split into n parts, switching between the functions evenly.",
        parameters: [
          {
            label: "Input Function 1",
            defaultValue: preset.sinWave,
            includeInGraph: true,
          },
          {
            label: "Input Function 2",
            defaultValue: preset.cubic,
            includeInGraph: true,
          },
          {
            label: "Input Function 3",
            defaultValue: preset.linear,
            includeInGraph: true,
          },
        ],
      },
      splitScale: {
        f: (f: EasingFunction) => (g: EasingFunction) => (h: EasingFunction) =>
          decorator.splitScale([f, g, h]),
        title: "SplitScale",
        code: "decorator.splitScale([f,g,h])",
        description:
          "Same as splitN() except splitScale also scales each function so that it fits within its alloted space.",
        parameters: [
          {
            label: "Input Function 1",
            defaultValue: preset.cubic,
            includeInGraph: true,
          },
          {
            label: "Input Function 2",
            defaultValue: preset.linear,
            includeInGraph: true,
          },
          {
            label: "Input Function 3",
            defaultValue: preset.cubic,
            includeInGraph: true,
          },
        ],
      },
      sequence: {
        f: (f: EasingFunction) => (g: EasingFunction) => (h: EasingFunction) =>
          decorator.sequence([f, g, h]),
        title: "Sequence",
        code: "decorator.sequence([f,g,h])",
        description:
          "Same as splitScale() except sequence scales each function to start at the end of the last one.",
        parameters: [
          {
            label: "Input Function 1",
            defaultValue: preset.cubic,
            includeInGraph: true,
          },
          {
            label: "Input Function 2",
            defaultValue: preset.linear,
            includeInGraph: true,
          },
          {
            label: "Input Function 3",
            defaultValue: preset.cubic,
            includeInGraph: true,
          },
        ],
      },
      repeat: {
        f: decorator.repeat,
        title: "Repeat",
        code: "decorator.repeat(times)(f)",
        description:
          "Creates a function that repeats another function n times within the span of the fuction.",
        parameters: [
          { label: "times", defaultValue: 5, min: 1, max: 10, step: 1 },
          {
            label: "Input Function",
            defaultValue: preset.linear,
            includeInGraph: false,
          },
        ],
      },
      repeatSequence: {
        f: decorator.repeatSequence,
        title: "RepeatSequence",
        code: "decorator.repeatSequence(times)(f)",
        description:
          "Creates a function that repeats another function n times within the span of the fuction but each one will be played one after the next.",
        parameters: [
          { label: "times", defaultValue: 5, min: 1, max: 10, step: 1 },
          {
            label: "Input Function",
            defaultValue: preset.cubic,
            includeInGraph: false,
          },
        ],
      },
      easeOut: {
        f: decorator.easeOut,
        title: "EaseOut",
        code: "decorator.easeOut(f)",
        description:
          "Takes a function that normally starts slow and ends fast (ease in) and returns a function that starts fast and ends slow (ease out).",
        parameters: [
          {
            label: "Input Function",
            defaultValue: preset.cubic,
            includeInGraph: true,
          },
        ],
      },
      easeInOut: {
        f: decorator.easeInOut,
        title: "EaseInOut",
        code: "decorator.easeInOut(f)",
        description:
          "Takes a function that normally starts slow and ends fast (ease in) and returns a function that starts slow, goes fast, and ends slow (ease in out). In actuality, the function is composed using `sequence` and `reflectXY` so the results are unpredictable if you use a non-easeIn function as an input.",
        parameters: [
          {
            label: "Input Function",
            defaultValue: preset.cubic,
            includeInGraph: true,
            options: {
              quadIn: preset.quadIn,
              cubicIn: preset.cubicIn,
              cubicOut: preset.cubicOut,
            },
          },
        ],
      },
      easeMiddle: {
        f: decorator.easeMiddle,
        title: "EaseMiddle",
        code: "decorator.easeMiddle(f)",
        description:
          "Takes a function that normally starts slow and ends fast (ease in) and returns a function that starts fast, goes slow, and ends fast (ease out in / ease middle).",
        parameters: [
          {
            label: "Input Function",
            defaultValue: preset.cubic,
            includeInGraph: true,
          },
        ],
      },
    },
  },
  {
    title: "Utility",
    description:
      "Additional helper utilities for working with easing functions.",
    examples: {
      render: {
        f: util.render,
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
      I: {
        f: util.I,
        title: "I Combinator",
        code: "util.I(x)",
        exampleType: "hidden",
        description:
          "I combinator. AKA Idiot, Identity. Simply returns the argument passed to it. Used to create a simple `linear` function.",
      },
      K: {
        f: util.K,
        title: "K Combinator",
        code: "util.K(x)",
        exampleType: "hidden",
        description:
          "K combinator. AKA Kestrel, Constant, Always. Takes a value and returns a function that always returns that value. Used to create a simple `constant` function.",
      },
    },
  },
];

export default exampleData;
