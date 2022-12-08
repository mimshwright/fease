module.exports = {
  "*": "yarn lint:prettier",
  "*.{t}s{,x}": () => "yarn build:tsc",
  "*.{j,t}s{,x}": ["yarn lint:eslint", () => "yarn test"],
};
