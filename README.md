# comp-check
[![Build Status](https://travis-ci.org/mmcglone/comp-check.svg?branch=master)](https://travis-ci.org/mmcglone/comp-check)
[![Coverage Status](https://coveralls.io/repos/mmcglone/comp-check/badge.svg?branch=master)](https://coveralls.io/r/mmcglone/comp-check?branch=master)
[![npm version](https://badge.fury.io/js/comp-check.svg)](https://badge.fury.io/js/comp-check)

A Javascript library to help with null checking in functional composition

## Example Usage
Suppose we have the following data
```javascript
const usersById = {
  123: {
    id: 123,
    firstName: 'John',
    lastName: 'Smith',
    father: 456,
  },
  456: {
    id: 123,
    firstName: 'Fred',
    lastName: 'Smith',
    father: null,
  }
};
```
and the following functions:
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
And suppose we want to compose these functions into a pure function that returns
the full name of a user's father given the user's id.
The following won't work, because we'd end up with an impure function:
```javascript
const pipe = require('lodash/fp/pipe');

const fathersName = pipe(
  userFromId,
  father,
  fullName
);
```
Our function is impure because it throws errors that it doesn't catch,
when `userFromId` or `father` return null:
```javascript
// When userFromId returns null
fatherFullName(789); // TypeError: Cannot read property 'father' of null

// When father returns null
fatherFullName(456); // TypeError: Cannot destructure property `firstName` of 'undefined' or 'null'.
```
To achieve purity we need to handle these null values without uncaught errors.

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
that distract from the main positive focus of our function.
Using comp-check, we can achieve the same result without all the mess:
```javascript
const fatherFullName = pipe(
  maybe, // wraps argument into a container called a "Maybe"
  map(userFromId), // applies userFromId to wrapped value if not null and wraps it into a new Maybe
  map(father), // does the same thing but with father
  map(fullName), // does the same thing but with fullname
  always(value => value) // unwraps the value an returns it
);
```
