const value = Symbol('value');

class Maybe {
  constructor(val) {
    this[value] = val instanceof Maybe ? val[value] : val;
  }

  static of(val) {
    return new Maybe(val);
  }

  get isNull() {
    return this[value] === null;
  }

  map(f) {
    return this.isNull ? this : new Maybe(f(this[value]));
  }

  chain(f) {
    return this.isNull ? this : f(this[value]);
  }

  always(f) {
    return f(this[value]);
  }
}

module.exports = Maybe;
