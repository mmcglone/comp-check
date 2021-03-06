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

const father = user => {
  const { father } = user;
  return father === undefined ? null : userFromId(father);
};

const fullName = user => {
  const { firstName, lastName } = user;
  return firstName === undefined || lastName === undefined
    ? null
    : `${firstName} ${lastName}`;
};
```
And suppose we want to compose these functions into a *pure* function that returns
the full name of a user's father given the user's id.

The following won't work, because it's impure:
```javascript
const pipe = require('lodash/fp/pipe');

const fatherFullName = pipe(
  userFromId,
  father,
  fullName
);
```
It's impure because it throws errors that it doesn't catch, for example,
when `userFromId` or `father` returns null:
```javascript
fatherFullName(123); // Fred Smith
fatherFullName(789); // TypeError: Cannot read property 'father' of null
fatherFullName(456); // TypeError: Cannot destructure property `firstName` of 'undefined' or 'null'.
```
To achieve purity we need to handle these null values without uncaught errors.

In effect, we need something along the following lines:
```javascript
const pipe = require('lodash/fp/pipe');

const fatherFullName = pipe(
   userFromId,
   value => {
     if (value === null) return null;
     return father(value);
   },
   value => {
     if (value === null) return null;
     return fullName(value);
   }
);

fatherFullName(123); // Fred Smith
fatherFullName(789); // null
fatherFullName(456); // null
```
But achieving purity in this way exposes repetitive null checking details
that distract from the main positive focus of our function.
Using comp-check, we can achieve the same result without all the mess:
```javascript
const { always, map, maybe } = require('comp-check');
const pipe = require('lodash/fp/pipe');
const identity = require('lodash/fp/identity');

const fatherFullName = pipe(
  maybe, // wraps our argument in a new object called a "Maybe"
  map(userFromId), // applies userFromId to our argument if not null
  map(father), // applies father to the result if not null
  map(fullName),  // does the same but with fullName
  always(identity) // returns our final result, null or not
);
```
