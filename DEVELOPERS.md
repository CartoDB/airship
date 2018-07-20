# Developer Notes

## Continuous Integration
We're using CircleCI as our Continuous Integration server. It currently runs several jobs after each commit at github, to run lint and unit tests for 'components' and 'styles' (see `.circleci/config.yml` for more details).


### ⚠️ WARNING: Reference images for tests
CircleCI currently passes all checks. But it will fail when new *reference images* will be created for our tests.

Follow these manual steps to fix the problem, as snapshots generated at local dev and remote CircleCI machine may differ, and we want CircleCI ones to be the authoritative source:

1. Create your component.
2. If you want circleCI to generate the reference generate a`ìmg` directory with a empty `.gitkeep` file inside.
3. Open a PR/commit
4. CircleCI will generate a branch with the same name adding the new reference in a commit.
5. Merge this branch into yours when ready.


### CircleCI Tools for developers
- CircleCI has a local CLI to run / test the jobs: See https://circleci.com/docs/2.0/local-cli/
- To (locally) Run a single JOB: `circleci build --job JOB_NAME` eg:
`circleci build --job test-unit:components` or `circleci build --job test-unit:styles`
- It seems it is not possible (yet) to run locally the whole workflow
