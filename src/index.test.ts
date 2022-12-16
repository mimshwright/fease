import * as fease from "./index";

describe("fease library", () => {
  test("Index file exports rest of library", () => {
    expect(fease).toHaveProperty("decorator");
    expect(fease).toHaveProperty("factory");
    expect(fease).toHaveProperty("preset");
    expect(fease).toHaveProperty("util");
  });
});
