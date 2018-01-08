#!/usr/bin/env bash
# Script for copying the build process to another dir, like a legacy project.

if [ ! -z "$1" ]; then
  cp -r build "$1/build"
  cp -r src "$1/src"
  cp inc/Assets.php "$1/Assets.php"
  cp .gitignore "$1/."
  cp .editorconfig "$1/."
  cp .eslintrc.js "$1/."
  cp package.json "$1/."
else
  echo "Copy target not provided, provide path without a trailing slash."
  exit 1
fi
