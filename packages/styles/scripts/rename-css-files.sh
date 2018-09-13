#!/bin/sh
find dist/ -type f -name '*.css' -exec mv '{}' '{}'.min.css \;
