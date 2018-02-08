const main = require('../index');
const always = require('../always');
const chain = require('../chain');
const map = require('../map');
const Maybe = require('../Maybe');

describe('The main module', () => {
  it('should export an object', () => {
    expect(main).toEqual(jasmine.any(Object));
  });
  describe('and that object should have', () => {
    it('always as its always method', () => {
      expect(main.always).toBe(always);
    });
    it('chain as its chain method', () => {
      expect(main.chain).toBe(chain);
    });
    it('map as its map method', () => {
      expect(main.map).toBe(map);
    });
    it('Maybe as its Maybe property', () => {
      expect(main.Maybe).toBe(Maybe);
    });
    it('Maybe.of as its maybe method', () => {
      expect(main.maybe).toBe(Maybe.of);
    });
  });
});
