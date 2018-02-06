# comp-check
[![Build Status](https://travis-ci.org/mmcglone/comp-check.svg?branch=master)](https://travis-ci.org/mmcglone/comp-check)
[![Coverage Status](https://coveralls.io/repos/mmcglone/comp-check/badge.svg?branch=master)](https://coveralls.io/r/mmcglone/comp-check?branch=master)
[![npm version](https://badge.fury.io/js/comp-check.svg)](https://badge.fury.io/js/comp-check)

A Javascript library to help with null checking in functional composition

## Example Usage
Suppose we have the following functions and we want to compose them into
a pure function that returns user's father's full name given an id.
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
The following won't work, because our function isn't pure:
```javascript
const fathersName = compose(
  fullName,
  father,
  userFromId
);
```
It's impure because it throws errors that it doesn't catch,
when either userFromId or father returns null.

To achieve purity we need to handle null values without throwing uncaught
errors.

In effect, we need the following:
```javascript
const fatherFullName = compose(
   userFromId,   value => {
     if (value === null) return null;
     return fullName(value);
   },
   value => {
     if (value === null) return null;
     return father(value);
   }
   userFromId,
);
```
Achieving purity in this way, leads to some, using a few functions from comp-check,
we can obtained the same effect without all the full.
```javascript
const fatherFullName = compose(
  always(identity)
  map(fullName),
  map(father),
  map(userFromId), // calls userFromId on the value if the Maybe isn't null
  maybe // Wrap incoming value in a Maybe
);
```
