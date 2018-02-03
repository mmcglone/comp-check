const curry = require('lodash/fp/curry');

const map = curry((f, e) => e.map(f));

module.exports = map;
