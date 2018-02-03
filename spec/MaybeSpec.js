const Maybe = require('../Maybe');
const identity = require('lodash/fp/identity');

describe('A Maybe', () => {
  const maybeValue = 123;
  const maybe = new Maybe(maybeValue);
  const maybeWithNull = new Maybe(null);

  /* existence and readability of value */
  it('should wrap a value that can be read through its "always" method using an identify function', () => {
    expect(maybe.always(identity)).toEqual(maybeValue);
    expect(maybeWithNull.always(identity)).toEqual(null);
  });

  /* creation */
  describe('when created from a non-maybe', () => {
    it('should have that non-maybe as its value', () => {
      expect(maybe.always(identity)).toBe(maybeValue);
    });
  });
  describe('when created from an Maybe', () => {
    it('should have the value of that either as its value', () => {
      const maybe2 = new Maybe(maybe);
      expect(maybe2.always(identity)).toBe(maybeValue);
    });
  });

  /* always */
  describe('when its "always" method is called with a function f', () => {
    describe('regardless of whether its value v is null or not', () => {
      it('should return f(v)', () => {
        expect(maybe.always(value => `${value}`)).toBe('123');
        expect(maybeWithNull.always(value => `${value}`)).toBe('null');
      });
    });
  });

  /* chain */
  describe('when its "chain" method is called with a function f', () => {
    describe('when its value is a non-null value v', () => {
      it('should return f(v)', () => {
        expect(maybe.chain(value => value + 3)).toBe(126);
      });
    });
    describe('when its value is null', () => {
      describe('when its chain method is called with a function f', () => {
        it('should return a Maybe whose value is null', () => {
          const result = maybeWithNull.chain(value => value + 3);
          expect(result).toEqual(jasmine.any(Maybe));
          expect(result.always(identity)).toBe(null);
        });
      });
    });
  });

  /* map */
  describe('when its map method is called with a function f', () => {
    describe('when its value is a non-null valuev', () => {
      describe('when f does not throw', () => {
        it('should return a Maybe whose value is f(v)', () => {
          const result = maybe.map(value => value + 3);
          expect(result).toEqual(jasmine.any(Maybe));
          expect(result.always(identity)).toBe(126);
        });
      });
    });
    describe('when its value is null', () => {
      describe('when its map method is called with a function f', () => {
        it('should return an Maybe whose value is null', () => {
          const result = maybeWithNull.map(value => value + 3);
          expect(result).toEqual(jasmine.any(Maybe));
          expect(result.always(identity)).toBe(null);
        });
      });
    });
  });
});

describe('The static method Maybe.of', () => {
  describe('when called with a value v', () => {
    it('should return a Maybe whose value is v', () => {
      const val = 123;
      const maybe = Maybe.of(val);
      expect(maybe).toEqual(jasmine.any(Maybe));
      expect(maybe.always(identity)).toBe(val);
    });
  });
});
