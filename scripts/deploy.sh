#!/usr/bin/env bash

if [ -z $TRAVIS_TAG ];
then
  echo "TRAVIS_TAG env var is not defined, not a tag build.";
  exit 1;
fi

npm version --no-git-tag-version $TRAVIS_TAG
if [[ $? == 0 ]];
then
  npm publish
else
  echo "Failed to Update npm version to $TRAVIS_TAG"
  exit 1;
fi
