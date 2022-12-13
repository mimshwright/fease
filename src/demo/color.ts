const light = {
  background: 0xeeffff,
  foreground: 0x666600,
  secondFunction: 0xccccaa,
  gridColor: 0xeeccff,
  markerColor: 0xff9900,
  exampleColor: 0xff6600,
};

const dark: typeof light = {
  ...light,
  background: 0x224444,
  foreground: light.gridColor,
  secondFunction: 0xaa77aa,
  gridColor: 0x9944dd,
  exampleColor: 0xffa1ac,
};

export default { dark, light };
