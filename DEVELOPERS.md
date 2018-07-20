# Developer Notes

## Continuous Integration
We're using CircleCI as our Continuous Integration server. It currently runs several jobs after each commit at github, to run lint and unit tests for 'components' and 'styles' (see `.circleci/config.yml` for more details).


### ⚠️ WARNING: Reference images for tests
CircleCI currently passes all checks. But it could fail if we change the styles of our components (a bug vs a desired change in the visual properties, that's up to the developer).

The main point here is that, as snapshots generated at local dev and remote CircleCI machine may differ, we want **CircleCI** ones to be the authoritative source. And to get that working we will have to keep a set of committed images in our project, coming from the CI (e.g. `button-reference.png`). Those images should be periodically inspected by the developer, to check they are fine.

Workflows:
A. New style
B. Update style

#### a. New style
In this case, there are no reference image/s yet, so we just commit the component in our PR as usual and wait for the CI to execute the tests and create those images for the first time.

After the PR passes the tests at github, we must connect to the CI to download the new reference images, so we can add them to our git repository. 

We get that with these steps:

1. connect to the docker machine where CircleCI has successfully executed the `test-unit:styles` job for our branch. That can be found at https://circleci.com/gh/CartoDB/workflows/airship

2. rerun job with ssh and get {ip} and {port}. For example, if job number is 588, go to https://circleci.com/gh/CartoDB/airship/588 (see [ssh reference](https://circleci.com/docs/2.0/ssh-access-jobs/) for troubleshooting).

3. download new image reference with our **npm script**:
    - execute `npm run update-styles-reference -- {ip} {port}` with your SSH credentials in CircleCI

4. inspect the new images for correctness

5. if everything is ok, commit & push, so a new CircleCI execution will run (all checks should pass).


#### b. Update style
If the update doesn't involve changes in the screenshot, the CI passes the tests and we're done.

If it does, that will make CircleCI fail, so we need to participate:
- b1. it is a bug. We fix the bug with the styles. Commit & Push should end with a successful run in CircleCI.
- b2. it is a desired change. Then we have to delete the *old reference image* from the project and commit & push that change. We will follow the same steps as in *a. New style*.


### CircleCI Tools for developers
- CircleCI has a local CLI to run / test the jobs: See https://circleci.com/docs/2.0/local-cli/
- To (locally) Run a single JOB: `circleci build --job JOB_NAME` eg:
`circleci build --job test-unit:components` or `circleci build --job test-unit:styles`
- It seems it is not possible (yet) to run locally the whole workflow
