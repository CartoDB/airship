# Developer Notes

- [Project structure](#project-structure)
- [Testing](#testing)
- [Commit style](#commit-style)
- [Releasing a new version](#releasing-a-new-version)
- [Changelog](#changelog)


## Project structure

This is a [Lerna](https://lernajs.io/) [monorepo](https://en.wikipedia.org/wiki/Monorepo) composed of 3 node packages in the `packages`.

## Developing

Run `npm run dev` to start developing. This commands starts the Stencil compiler for the components and the Sass compiler for the styles. Both in watch mode.

If you need to use a browser to test your development, please open a new shell prompt and run `npm run serve` to start a dev server.

## Testing

- `airship-styles` are tested using [BackstopJS](https://github.com/garris/BackstopJS) using Docker both in CI and locally to have consistent results.
- `airship-components` are build using [stenciljs](http://stenciljs.com) and have 2 types of tests: `unit` and `e2e`.

### Continuous Integration
We're using CircleCI as our Continuous Integration server. It currently runs several jobs after each commit at github, to run lint and unit tests for 'components' and 'styles' (see `.circleci/config.yml` for more details).


### Visual regression testing
`Styles` package has visual regression testing. This way, we get notified when a change on styles break existing ones.

This kind of testing relies on a set of reference images that are approved. Subsequent test run the test comparing the results against the reference. Any mismatch will trigger an error and fail the build.

We use BackstopJS for these tests. It provides a Docker image that allow us to get the same result for test despite the working environment. The Docker image is the responsible for creating the references and the test images, whether is local or CI.

**Create image references**

You must create visual specs for every CSS component you create. Follow these steps:
- Create a `test` folder within the component folder.
- Create as many `html` as needed to check every possible state of the component.
- Create a `wadus.spec.js` that returns an array of specs consisting of the test label and the local `.html` file that asserts that scenario. The format is:

```
const Utils = require('../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('Tabs', 'tabs.html'),
  u.spec('Tabs XL', 'tabs-xl.html'),
  u.spec('Tabs accesible', 'tabs-accesible.html')
];
```

- Run `npm run test:build-references`. This will create the new references. Check them and, if they're OK, commit them to the project. `BackstopJS` will use these references from now on.

**Recreate image references**

If you make any change in an existing visual spec, run `npm run test:build-references`. This command recreates the reference and if there's any difference, the current git diff will tell you that there are changes in an existing reference.

If you're OK with the reference image, commit it.

**Running the tests locally**

You need a particular Docker image to run the tests. If you don't have Docker installed in your system, please refer to the official documentation to know how to install Docker in your system.

To run locally the visual regression test, type `npm run test:styles`. When finished, the command will open a HTML report.

### CircleCI Tools for developers
- CircleCI has a local CLI to run / test the jobs: See https://circleci.com/docs/2.0/local-cli/
- To (locally) Run a single JOB: `circleci build --job JOB_NAME` eg:
`circleci build --job test-unit:components` or `circleci build --job test-unit:styles`
- It seems it is not possible (yet) to run locally the whole workflow


## Commit style

We use [conventional commits](https://www.conventionalcommits.org/) to have more consistent commits and autogenerate a changelog.

Feel free to write your regular commtis as you want, but **the merge commit has to follow CC format:**.

We usually use one of the following:

```
chore|fix|feat(styles|components|icons|chore|docs): message (#PR)

[optional description]

Fix #issue
```

## Releasing a new version

We use [lerna](https://lernajs.io/) to keep two internal packages in sync.

Once you have your changes merged to master branch run `npm run release` and follow the given instructions.


## Changelog

Once a new version is released just run `npm run changelog` and push your changes.