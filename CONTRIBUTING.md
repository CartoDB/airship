# Contributing Guide

<!-- TOC -->

- [Contributing Guide](#contributing-guide)
    - [Setup](#setup)
        - [Getting setup to contribute](#getting-setup-to-contribute)
        - [Creating feature branches](#creating-feature-branches)
        - [Running the project](#running-the-project)
        - [Running the documentation](#running-the-documentation)
        - [Running the tests](#running-the-tests)
    - [Pull Requests](#pull-requests)
        - [Making pull requests](#making-pull-requests)
    - [Reporting an Issue/Feature Requests](#reporting-an-issuefeature-requests)
    - [The Workflow](#the-workflow)
        - [yarn Tasks](#yarn-tasks)
    - [Project Structure](#project-structure)

<!-- /TOC -->

## Setup

### Getting setup to contribute

1. Fork repository by clicking the fork button on Github
2. Clone repository with `git clone git@github.com:<your handle>/airship.git`
3. Navigate to the repository folder and install dependencies with: `yarn install` (we require [node][https://nodejs.org/en/] 8.x.x at the moment)
4. If you don't have yarn installed, it can be easily installed following the instruction in the [yarn docs][https://yarnpkg.com/en/]


### Creating feature branches

1. in local master, set upstream to git@github.com:CartoDB/airship.git

    `git remote add upstream git@github.com:CartoDB/airship.git`

2. pull the most recent changes by rebasing master

    `git pull --rebase upstream master`

3. Create a new branch by typing:

     `git checkout -b <your branch name>`


### Running the project

We use [Storybook](https://storybook.js.org/) for development, it provide us a really nice playground where we can work pretty fast while changing / creating components.

 + In the root or the repository folder, run:

    `yarn start`

This process will generate the storybook, after it finishes you can access it visiting http://localhost:9009/.

The stories are located in every component's folder, in a file called `<component name>.stories.js`.

If you add a new component or edit an existing one you have to update the documentation, read below to learn how to do it.

### Running the documentation

We use [Catalog](https://www.catalog.style/) for our documentation, if you add a new

 + In the root or the repository folder, run:

    `yarn styleguide`

 + In a second terminal window, run:

    `yarn run styleguide`

This process will generate the styleguide and show it in http://localhost:4000/.

The file for the demos are located in `/docs`, every component has its own file under `/docs/components`.

### Running the tests

We use [Jest](https://facebook.github.io/jest/) for our tests.

 + If you want to run them once, use:

    `yarn test`

 + If you want to use the watch mode, run:

    `yarn test:watch`

The tests are located in every component's folder, in a file called `<component name>.test.js`.

## Pull Requests

### Making pull requests

1. When you're finished coding, `git checkout master`
2. `git pull upstream master` (note that your local master should always reflect upstream master)
3. `git checkout <your branch>`
4. `git rebase master` & reconcile all conflicts
5. `git push origin <your branch>`
6. Make your PR with a link to the original issue filed (if you see "unable to merge", please pull from your upstream and rebase again)
7. Be patient :)

---

## Reporting an Issue/Feature Requests

Please use the [issues](https://github.com/CartoDB/airship/issues) section of the Airship Github profile to submit any bugs found. Please be descriptive and feel free to add pictures or links to docs to make your point as clear as possible.

## The Workflow

### yarn Tasks

The build sequence consists of a small set of [Node][node] tasks. While you'll probably only need `yarn run test` and `yarn run build` most of the time, the other tasks can be called independently or combined in order to see the docs.

| Task                     | Description
| ---------                | ---
| `yarn start`             | Start the development playground
| `yarn test`              | Run the Jest runner once
| `yarn test:watch`        | Start the Jest runner that will test the project and keep watching for changes
| `yarn styleguide`        | Serves the documentation
| `yarn styleguide:build`  | Builds the documentation
| `yarn build`             | Build everything and generate the distribution version
| `yarn lint`              | Runs the ESLint linter
| `yarn lint:fix`          | Runs the ESLint linter fixing easy problems
| `yarn release`           | Create a new release of the library.
| `yarn release:minor`     | Create a new release of the library by bumping the second number of the version (1.N.1)
| `yarn release:major`     | Create a new release of the library by bumping the third number of the version (N.1.1)

## Project Structure

The default directory structure looks something like this:

``` static
airship
├── config
├── dist
├── docs
├── src
│   ├── components
│   ├── constants
│   └── utils
└── static
```


| Folder                  | Description
| ---                     | ---
| **config**              | Where the jest and storybook configs are placed
| **dist**                | Where the production ready bundle of our charts will be placed
| **docs**                | Where the demo website files are placed
| **src**                 | Where we will place the code we create
| **src/components**      | Where our components live
| **src/constants**       | Where our components general config lives, like colors, sizes, etc
| **src/utils**           | Where our general helpers live
