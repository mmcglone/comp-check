const always = require('./always');
const chain = require('./chain');
const map = require('./map');
const Maybe = require('./Maybe');

module.exports = {
  always,
  chain,
  map,
  Maybe,
  maybe: Maybe.of,
};
