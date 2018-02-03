const mainConfig = require('../.eslintrc');

const env = Object.assign(
  {},
  mainConfig.env,
  { jasmine: true }
);

module.exports = Object.assign(
  {},
  mainConfig,
  { env }
);
