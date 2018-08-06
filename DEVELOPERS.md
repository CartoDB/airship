# Developer Notes

## Continuous Integration
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

- Run `npm run visual:reference`. This will create the new references. Check them and, if they're OK, commit them to the project. `BackstopJS` will use these references from now on.

**Recreate image references**

If you make any change in an existing visual spec, run `npm run visual:reference`. This command recreates the reference and if there's any difference, the current git diff will tell you that there are changes in an existing reference.

If you're OK with the reference image, commit it.

**Running the tests locally**

You need a particular Docker image to run the tests. If you don't have Docker installed in your system, please refer to the official documentation to know how to install Docker in your system.

To run locally the visual regression test, type `npm run test:styles`. When finished, the command will open a HTML report.

### CircleCI Tools for developers
- CircleCI has a local CLI to run / test the jobs: See https://circleci.com/docs/2.0/local-cli/
- To (locally) Run a single JOB: `circleci build --job JOB_NAME` eg:
`circleci build --job test-unit:components` or `circleci build --job test-unit:styles`
- It seems it is not possible (yet) to run locally the whole workflow

### Releasing a new version

We use [lerna](https://lernajs.io/) to keep two internal packages in sync.

Once you have your changes merged to master branch run `npm run release` and follow the given instructions.

### Airship Showcase
We use Catalog to showcase our components and styles, as well as having some documentation to know how to use them.
If you want to launch it, execute `npm run showcase`. It doesn't livereload or shows changes in source code when refreshing the page. To see those changes you need to `CTRL + C`, and execute the command again.

There might be some times that the browser says the page is not available, it is due to `serve` script. You don't need to worry about that, press `F5` or `CMD + R` and Catalog will be there.
