#!/bin/bash


branch=$(git rev-parse --abbrev-ref HEAD)
ssbranch=$branch"-circleci-screenshot"


if [[ "$branch" == *-circleci-screenshot ]]
then
  git add .
  git commit --amend -no-edit
  git push origin head -f

else
  echo "Checking if branch exists"
  if [ `git branch --list $ssbranch ` ]
  then
    echo "Branch exists, deleting..."
    git branch -D $ssbranch
    git push origin --delete $ssbranch
  fi

  echo "Creating branch again"
  git checkout -b $ssbranch
  git add .
  git commit -m "Add screenshot references"
  git push origin head
fi

