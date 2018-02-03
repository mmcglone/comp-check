const Maybe = require('../Maybe');
const always = require('../always');

describe('always', () => {
  describe('when called with a function f and alwaysable a', () => {
    it('should return a.always(f)', () => {
      const a = new Maybe(12345);
      const f = value => value + 11;
      expect(always(f, a)).toEqual(12356);
    });
  });
});
