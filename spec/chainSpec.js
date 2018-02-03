const Maybe = require('../Maybe');
const chain = require('../chain');

describe('chain', () => {
  describe('when called with a function f and chainable a', () => {
    it('should return a.chain(f)', () => {
      const a = new Maybe(12345);
      const f = value => value + 11;
      expect(chain(f, a)).toEqual(a.chain(f));
    });
  });
});
