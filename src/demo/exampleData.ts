import * as preset from "../preset";
import * as factory from "../factory";
import * as decorator from "../decorator";

export default [
  {
    title: "Presets",
    description:
      "Commonly used easing functions that require no additional parameters. You'll find most of the well-known easing functions here.",
    examples: [
      {
        f: preset.linear,
        title: "Linear",
        code: "preset.linear()",
        description: "TBD",
      },
      {
        f: preset.quad,
        title: "Quadratic",
        code: "preset.quad()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },

      {
        f: preset.cubic,
        title: "Cubic",
        code: "preset.cubic()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },

      {
        f: preset.quartic,
        title: "Quartic",
        code: "preset.quartic()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },
      {
        f: preset.quintic,
        title: "Quintic",
        code: "preset.quintic()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },
      {
        f: preset.sextic,
        title: "Sextic",
        code: "preset.sextic()",
        description: "TBD",
        seeAlso: ["Exponential"],
      },

      {
        f: preset.sinWave,
        title: "Sine Wave",
        code: "preset.sinWave()",
        description: "TBD",
      },

      {
        f: preset.cosWave,
        title: "Cosine Wave",
        code: "preset.cosWave()",
        description: "(cos is identical to sin but the phase is +25%)",
        seeAlso: ["ShiftX"],
      },
    ],
  },
  {
    title: "Factories",
    description:
      "Factories are functions that create a new type of Easing Funciton. They may take 1 or more parameters.",
    examples: [
      {
        f: factory.exp,
        title: "Exponential",
        code: "factory.exp(exponent)",
        description: "Creates an exponential function with a given exponent.",
        seeAlso: ["Polynomial"],
        parameters: [{ label: "exponent", min: -2, max: 6, defaultValue: 3 }],
      },
      {
        f: factory.poly([2, -1, -2, 2]),
        title: "Polynomial",
        code: "factory.poly([c0,c1,...c(n-1)])",
        description:
          "Creates a polynomial equation using an array that represents the coefficients of each degree starting with x^0 up to x^n-1. For example, `poly([-8,6,-4,2])` would result in the equation `2x^2 - 4x^2 + 6x -8`",
        seeAlso: ["Exponential"],
      },
      {
        f: factory.sine,
        title: "Sine",
        code: "factory.sine(freq)",
        description:
          "Creates a sine wave funciton with frequency a number of in full oscillations between 0 and 1 input.",
        parameters: [
          { label: "frequency", min: 0.01, max: 20, defaultValue: 1 },
        ],
      },
    ],
  },
  {
    title: "Decorators",
    description:
      "Decorators take an Easing Function, and often 1 or more additional parameters, as input and return a modified function.",
    examples: [
      {
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

      {
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

      // shiftXY

      {
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

      {
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

      {
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
          },
        ],
      },

      {
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
      {
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
      {
        f: decorator.reflectXY,
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
      },
    ],
  },
];
