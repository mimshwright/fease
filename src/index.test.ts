import { describe, test, expect } from "vitest";
import * as fease from "./index";

describe.concurrent("fease library", () => {
  test("Index file exports rest of library", () => {
    // expect(fease).toHaveProperty("factory");
    // expect(fease).toHaveProperty("decorator");
    // expect(fease).toHaveProperty("combinator");
    // expect(fease).toHaveProperty("preset");
    // expect(fease).toHaveProperty("util");
    expect(fease).toHaveProperty("shiftX");
  });
});
