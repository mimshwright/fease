import * as poly from "../preset/exp";
import { EventuallyReturnsAnEasingFunction } from "../types";
import { DemoExample } from "./demoTypes";

export const createListing = (
  name: string,
  section: string,
  subsection: string,
  f: EventuallyReturnsAnEasingFunction,
  code: string,
  description = "TBD",
  alias?: string,
  hidden = false
): DemoExample => ({
  f,
  section,
  subsection,
  exampleType: hidden ? "hidden" : "graph",
  title: name,
  code,
  description,
  alias,
});

const getF = (name: string) =>
  poly[name as keyof typeof poly] as EventuallyReturnsAnEasingFunction;

const createPolyPresetListing = (
  name: string,
  mod: string,
  n: number,
  description: string,
  alias?: string,
  hidden = false
): DemoExample =>
  createListing(
    name + mod,
    "preset",
    "polynomial",
    getF(name + mod),
    `preset.${name + mod}()`,
    `${name} (x^${n}) ${description}`,
    alias,
    hidden
  );

export const createPolyPresetListingSet = (
  name: string,
  n: number
): Record<string, DemoExample> => ({
  [name]: createPolyPresetListing(
    name,
    "",
    n,
    `with ease in`,
    `${name}In`,
    true
  ),
  [name + "In"]: createPolyPresetListing(
    name,
    "In",
    n,
    `with easing at the start`,
    name
  ),
  [name + "Out"]: createPolyPresetListing(
    name,
    "Out",
    n,
    `with easing at the end`
  ),
  [name + "InOut"]: createPolyPresetListing(
    name,
    "InOut",
    n,
    "with easing in both the start and the end"
  ),
  [name + "OutIn"]: createPolyPresetListing(
    name,
    "OutIn",
    n,
    "with slowdown in the middle",
    name + "Middle"
  ),
  [name + "Middle"]: createPolyPresetListing(
    name,
    "Middle",
    n,
    "with slowdown in the middle",
    name + "OutIn",
    true
  ),
});
