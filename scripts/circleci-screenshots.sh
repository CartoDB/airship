#!/bin/bash


branch=$(git rev-parse --abbrev-ref HEAD)
ssbranch=$branch"-circleci-screenshot"

echo $ssbranch


git checkout -b $ssbranch
git add .
git commit -m "Add screenshot references"
git push origin head
