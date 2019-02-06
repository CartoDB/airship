# Developer Notes

- [Developer Notes](#developer-notes)
  - [Project structure](#project-structure)
  - [Developing](#developing)
  - [Testing](#testing)
    - [Continuous Integration](#continuous-integration)
    - [Visual regression testing](#visual-regression-testing)
    - [CircleCI Tools for developers](#circleci-tools-for-developers)
  - [Commit style](#commit-style)
  - [Releasing a new version](#releasing-a-new-version)
    - [Prerelase](#prerelase)
    - [Release](#release)
    - [Workflow](#workflow)
      - [Fixing bugs on a prerelease](#fixing-bugs-on-a-prerelease)
  - [Changelog](#changelog)
  - [CSS Variables](#css-variables)
    - [Naming](#naming)
      - [Global css-values](#global-css-values)
      - [Global css-variables](#global-css-variables)
      - [Specific css-values](#specific-css-values)
      - [Specific css-variables](#specific-css-variables)


## Project structure

This is a [Lerna](https://lernajs.io/) [monorepo](https://en.wikipedia.org/wiki/Monorepo) composed of 3 node packages in the `packages`.

## Developing

Run `npm run dev` to start developing. This commands starts the Stencil compiler for the components and the Sass compiler for the styles. Both in watch mode.

If you need to use a browser to test your development, please open a new shell prompt and run `npm run serve` to start a dev server.

## Testing

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

Feel free to write your regular commits as you want but ensure your PR has an associated conventional commit:

- Before the merge commit.
- Use squash and merge/rebase and merge button in github and use a conventionalcommit 

We usually use one of the following:

```
chore|fix|feat(styles|components|icons|chore|docs): message (#PR)

[optional description]

Fix #issue
```

## Releasing a new version

We use [lerna](https://lernajs.io/) wrapped with a npm script to keep all internal packages in sync.

### Prerelase

Once you merge a new branch into the master branch an optional `prerelease` tag can be published to do some acceptance testing.

    npm run publish:prerelease

### Release

Use the following script to release a public version.

    npm run publish


### Workflow

Everytime a branch is merged to master, an beta version can be released using the `npm run publish:prerelease` command. This command should increment the [semver](https://semver.org/) according to the [commit code](https://www.conventionalcommits.org/en/) and append a `prerelease` code.

So for example we are in the version `2.3.12` and we merge branch with a brand new feature.

```
tags   --- v2.3.12  ------------------------------>
master ---   A      ---------------------   B  --->
              \                            /
                --- new_feature_branch ---- 
```

The new version should be `v2.4.0` but before making it public we want to do a little QA generating a release candidate or prerelease pointing to **B**.

```
tags   --- v2.3.12  --------------------- v2.4.0-rc ---->
master ---   A      ---------------------   B  ------------>
              \                            /
                --- new_feature_branch ---- 
```

Once our `prerelease` version is published the [prerelease version in the CDN](https://libs.cartocdn.com/airship-components/prerelease/airship.js) will point to `v2.4.0-rc` and the [prerelease dist-tag in NPM](https://www.npmjs.com/package/@carto/airship-components) will point to `v2.4.0-rc`. The examples in the `smoke` folder relies on this prerelease version and they are as close as possible to a production environment so a QA can be done.

#### Fixing bugs on a prerelease

If you find a bug and merge a fix branch into master the new version should be `v2.4.0-rc.1`.

```
tags   --- v2.3.12  --------------------- v2.4.0-rc ----- v2.4.0-rc.1
master ---   A      ---------------------   B  ---------------> C
              \                            / \                 /
                --- new_feature_branch ----    --- bug_fix ---
```

## Changelog

We keep an automated changelog tracking every change affecting public versions. 

Once a new version is released just run `npm run changelog` and push your changes.

    npm run changelog

We dont want prereleases to be shown in the changelog so **git tags corresponding to a prerelase should be removed once the QA is done**.

> NOTE: You only need to remove it from github and the `changelog` script will prune all removed tags.

## CSS Variables

To achieve a better customization we use [css variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables). Follow these rules in order to write them in a consistent way.

We define two kinds of variables, global and specific:

- **Global Values:** This variables are declared in `styles/core.scss` under the `:root` selector and define specific values that are available on every css scope.
- **Global Variables:** This variables are declared in `styles/core.scss` under the `:root` selector and are available on every css scope.
- **Specific Values:** This variables are declared in the element/component styles and define a value that can be used in different places, usually specific variables. (Same value could be used in the table border and paragraph color)
- **Specific Variables:** This variables are defined in the styles of element/component and they're only  available under the element/component scope.

The variables should have a less specific one as fallback, so for example when developing the `stacked-bar` widget:

```css

  /** <style/core/core.scss> The values are initialized **/
  --as--color--primary: white;

  /** <stacked-bar-widget.scss> The values used with chained fallbacks, last fallback is a css-value **/
  --as-stacked-bar-widget--background-color: var(--as--widget__header--background-color, --as--color--primary);
```

With `--as-stacked-bar-widget--background-color` users can control specific widgets, with the shared variable `--as--widget__header--background-color` they can control all widgets, or they can just redefine the default value `--as--color--primary`.


### Naming

To keep things consistent we use a standard css naming:

#### Global css-values

    --as--<type>--<name>

- Use the `as` namespace to prevent naming collisions
- `<type>`refers to the content of the variable: `color`, `size`, `font`.
- `<name>`is the identifier of the variable: `primary`, `dark`, `big`.

#### Global css-variables

    --<element>--<property>--<modifier>

- `<element>`refers to element/component the variable affects: `as-map-footer`, `as-histogram-widget__header`.
- `<property>`is the css property affected: `background-color`, `margin`, `height`, `padding-left`.
- `<modifier>`use this when the variable refers to a altered status: `hover`, `focus`.


#### Specific css-values

    --<element>--<type>--<name>

- `<element>`refers to element/component the variable affects: `as-map-footer`, `as-histogram-widget__header`.
- `<type>`refers to the content of the variable: `color`, `size`, `font`.
- `<name>`is the identifier of the variable: `primary`, `dark`, `big`.


#### Specific css-variables

    --<element>--<property>--<modifier>

- `<element>`refers to element/component the variable affects: `as-map-footer`, `as-histogram-widget__header`.
- `<property>`is the css property affected: `background-color`, `margin`, `height`, `padding-left`.
- `<modifier>`use this when the variable refers to a altered status: `hover`, `focus`.
