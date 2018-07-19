# Developer Notes

## Continuous Integration
We're using CircleCI as our Continuous Integration server. It currently runs several jobs after each commit at github, to run lint and unit tests for 'components' and 'styles' (see `.circleci/config.yml` for more details).


### ⚠️ WARNING: Reference images for tests
CircleCI currently passes all checks. But it will fail when new *reference images* will be created for our tests.

Follow these manual steps to fix the problem, as snapshots generated at local dev and remote CircleCI machine may differ, and we want CircleCI ones to be the authoritative source:
1. comment img deletion from the test code (`/airship/packages/styles/src/test.js` >> LIN 29: `//fs.unlinkSync(output);`)
2. commit & push, to force new CircleCI run
3. ssh connection to new docker machine generated for the job. See [ssh reference](https://circleci.com/docs/2.0/ssh-access-jobs/) for troubleshooting.
4. download new image reference with our **npm script**:
    - execute `npm run update-styles-reference -- {ip} {port}` with your SSH credentials in CircleCI
5. commit the new images
6. uncomment the line in step 1.
7. commit both changes and push to github
8. a new CircleCI execution will run and all checks should pass


### CircleCI Tools for developers
- CircleCI has a local CLI to run / test the jobs: See https://circleci.com/docs/2.0/local-cli/
- To (locally) Run a single JOB: `circleci build --job JOB_NAME` eg:
`circleci build --job test-unit:components` or `circleci build --job test-unit:styles``
- It seems it is not possible (yet) to run locally the whole workflow
