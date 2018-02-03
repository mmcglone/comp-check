const curry = require('lodash/fp/curry');

const always = curry((f, e) => e.always(f));

module.exports = always;
