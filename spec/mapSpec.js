const Maybe = require('../Maybe');
const map = require('../map');

describe('map', () => {
  describe('when called with a function f and mapable m', () => {
    it('should return m.map(f)', () => {
      const m = new Maybe(12345);
      const f = value => value + 11;
      expect(map(f, m)).toEqual(new Maybe(12356));
    });
  });
});
