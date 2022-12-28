import { describe } from "vitest";
import { sequence, splitScale } from "../combinator";
import { cubic } from "../preset";
import { expectTestRange } from "../test/testUtil";
import { repeat, repeatSequence } from "./repeat";

describe.concurrent("decorators: repeat", () => {
  describe("repeat", () => {
    it("Should repeat the same funciton multiple times similar to splitScale.", () => {
      const repeatEx = repeat(3)(cubic);
      const splitScaleEx = splitScale([cubic, cubic, cubic]);
      expectTestRange(repeatEx).toMatchFunction(splitScaleEx);
    });
  });
  describe("repeatSequence", () => {
    it("Should repeat the same funciton multiple times similar to sequence.", () => {
      const repeatSequenceEx = repeatSequence(3)(cubic);
      const sequenceEx = sequence([cubic, cubic, cubic]);
      expectTestRange(repeatSequenceEx).toMatchFunction(sequenceEx);
    });
  });
});
