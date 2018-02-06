# comp-check
[![Build Status](https://travis-ci.org/mmcglone/comp-check.svg?branch=master)](https://travis-ci.org/mmcglone/comp-check)
[![Coverage Status](https://coveralls.io/repos/mmcglone/comp-check/badge.svg?branch=master)](https://coveralls.io/r/mmcglone/comp-check?branch=master)
[![npm version](https://badge.fury.io/js/comp-check.svg)](https://badge.fury.io/js/comp-check)

A Javascript library to help with null checking in functional composition

## Example Usage
Suppose we have the following functions and we want to compose them into
a pure function that takes a user's id and returns a user's father's full name.
```javascript
const userFromId = id => usersById[id] ? usersById[id] : null;

const father = user => userFromId(user.father);

const fullName = user => {
  const { firstName, lastName } = user;
  if (firstName === undefined || lastName === undefined) {
    return null
  }
  return `${firstName} ${lastName}`;
};
```
The following won't work, because we end up with an impure function:
```javascript
const pipe = require('lodash/fp/pipe');

const fathersName = pipe(
  userFromId,
  father,
  fullName
);
```
Our function is impure because it throws errors that it doesn't catch,
when `userFromId` or `father` return null.

To achieve purity we need to handle these null values without uncaught
errors.

In effect, we need the following:
```javascript
const fatherFullName = pipe(
   userFromId,
   value => {
     if (value === null) return null;
     return father(value);
   },
   userFromId,   value => {
     if (value === null) return null;
     return fullName(value);
   }
);
```
But achieving purity in this way exposes repetitive null checking details
that clutter distract from the main purpose of our function.
Using comp-check's `maybe`, `map`, and `always` functions, we can
achieve the same result without all the mess:
```javascript
const fatherFullName = pipe(
  maybe,
  map(userFromId),
  map(father),
  map(fullName),
  always(identity)
);
```
