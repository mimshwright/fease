import { shiftX } from "./decorator";
import { DemoSection, EasingFunction, addExampleToSection } from "./types";
import { exp, sine } from "./factory";
import { I } from "./util";

export const section: DemoSection = {
  title: "Presets",
  description:
    "Commonly used easing functions that require no additional parameters. You'll find most of the well-known easing functions here.",
  examples: [],
};
const addExample = addExampleToSection(section);

// Exponentials

export const linear: EasingFunction = I;
addExample({
  f: linear,
  title: "Linear",
  code: "preset.linear()",
  description: "TBD",
});

export const quad = exp(2);
addExample({
  f: quad,
  title: "Quadratic",
  code: "preset.quad()",
  description: "TBD",
});

export const cubic = exp(3);
addExample({
  f: cubic,
  title: "Cubic",
  code: "preset.cubic()",
  description: "TBD",
});

export const quartic = exp(4);
addExample({
  f: quartic,
  title: "Quartic",
  code: "preset.quartic()",
  description: "TBD",
});
export const quintic = exp(5);
addExample({
  f: quintic,
  title: "Quintic",
  code: "preset.quintic()",
  description: "TBD",
});
export const sextic = exp(6);
addExample({
  f: sextic,
  title: "Sextic",
  code: "preset.sextic()",
  description: "TBD",
});

// Waveforms

export const sinWave = sine(1);
addExample({
  f: sinWave,
  title: "Sine Wave",
  code: "preset.sinWave()",
  description: "TBD",
});

export const cosWave = shiftX(-0.25)(sine(1));
addExample({
  f: cosWave,
  title: "Cosine Wave",
  code: "preset.cosWave()",
  description: "(cos is identical to sin but the phase is +25%)",
});
