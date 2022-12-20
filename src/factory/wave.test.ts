import * as wave from "./wave";

describe("waveform factories", () => {
  it("Should define functions for waveforms", () => {
    expect(wave.sinusoid).toBeInstanceOf(Function);
    expect(wave.triangle).toBeInstanceOf(Function);
    expect(wave.sawtooth).toBeInstanceOf(Function);
    expect(wave.pulse).toBeInstanceOf(Function);
    expect(wave.square).toBeInstanceOf(Function);
  });
});
