const curry = require('lodash/fp/curry');

const chain = curry((f, e) => e.chain(f));

module.exports = chain;
