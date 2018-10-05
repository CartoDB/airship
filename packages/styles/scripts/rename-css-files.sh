#!/bin/sh
rm -rf dist/**/*.min.css
find dist/ -type f -name '*.css' ! -name '*.min.css' -exec bash -c 'mv "$1" "${1%.css}".min.css' - '{}' \;
