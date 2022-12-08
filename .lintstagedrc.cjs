module.exports = {
  "*": "yarn lint:prettier",
  "*.{j,t}s{,x}": [
    () => "yarn build:tsc",
    "yarn lint:eslint",
    () => "yarn test",
  ],
};
