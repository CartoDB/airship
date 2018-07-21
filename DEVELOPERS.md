# Developer Notes

## Continuous Integration
We're using CircleCI as our Continuous Integration server. It currently runs several jobs after each commit at github, to run lint and unit tests for 'components' and 'styles' (see `.circleci/config.yml` for more details).


### ⚠️ WARNING: Reference images for tests
CircleCI currently passes all checks. But it will fail when new *reference images* will be created for our tests.

Follow these manual steps to fix the problem, as snapshots generated at local dev and remote CircleCI machine may differ, and we want CircleCI ones to be the authoritative source:
1. comment img deletion from the test code (`/airship/packages/styles/src/test.js` >> LIN 29: `//fs.unlinkSync(output);`)
2. commit & push, to force new CircleCI run
3. ssh connection to new docker machine generated for the job. See [ssh reference](https://circleci.com/docs/2.0/ssh-access-jobs/) for troubleshooting.
4. download new image reference with **scp**:
    - You must connect with your *github credentials* to the temporal machine for the job, using the IP AND port displayed by CircleCI Web console (let's assume ip is **52.90.13.2** and port is **64546**). To check the public key being used: `ssh -v -p 64546 52.90.13.2`
    - And then copy with something like `scp -P 64546 52.90.13.2:airship/packages/styles/src/button/img/button.png ./reference.png`
5. commit the new image
6. uncomment the line in step 1.
7. commit both changes and push to github
8. a new CircleCI execution will run and all checks should pass


### CircleCI Tools for developers
- CircleCI has a local CLI to run / test the jobs: See https://circleci.com/docs/2.0/local-cli/
- To (locally) Run a single JOB: `circleci build --job JOB_NAME` eg:
`circleci build --job test-unit:components` or `circleci build --job test-unit:styles``
- It seems it is not possible (yet) to run locally the whole workflow

### Releasing a new version

We use [lerna](https://lernajs.io/) to keep two internal packages in sync.

Once you have your changes merged to master branch run `npm run release` and follow the given instructions.

## Airship Showcase
We use Catalog to showcase our components and styles, as well as having some documentation to know how to use them.
If you want to launch it, execute `npm run showcase`. It doesn't livereload or shows changes in source code when refreshing the page. To see those changes you need to `CTRL + C`, and execute the command again.

There might be some times that the browser says the page is not available, it is due to `serve` script. You don't need to worry about that, press `F5` or `CMD + R` and Catalog will be there.
