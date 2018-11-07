# Smoke testing

The aim of this folder is to provide an easy way to do smoke tests on Airship. This folder contains two dashboards generated with the `prerelase` version of Airship allowing manual before releasing a public version.

> Note, this should be a "temporal fix" and we need to automate this process as much as possible.


## Getting started

Everytime a branch is merged to master, an beta version can be released using the `npm run publish:prerelease` command. This command should increment the [semver](https://semver.org/) according to the [commit code](https://www.conventionalcommits.org/en/) and append a `prerelease` code.

So for example we are in the version `2.3.12` and we merge branch with a brand new feature.

```
tags   --- v2.3.12  ------------------------------>
master ---   A      ---------------------   B  --->
              \                            /
                --- new_feature_branch ---- 
```

The new version should be `v2.4.0` but before making it public we want to do a little QA generating a `prerelease` pointing to **B**.

```
tags   --- v2.3.12  --------------------- v2.4.0-alpha ---->
master ---   A      ---------------------   B  ------------>
              \                            /
                --- new_feature_branch ---- 
```

Once our `prerelease` version is published:

  - The [prerelease version in the CDN](https://libs.cartocdn.com/airship-components/prerelease/airship.js) will point to `v2.4.0-alpha`.
  - The [prerelease dist-tag in NPM](https://www.npmjs.com/package/@carto/airship-components) will point to `v2.4.0-alpha`.

The examples in the `smoke` folder relies on this prerelease version and they are as close as possible to a production environment so
a QA can be done.


> If you find a bug and merge a fix branch into master the new version should be `v2.4.1-alpha` instead `v2.4.0-alpha.1` to preserve the semantics in the public version.

```
tags   --- v2.3.12  --------------------- v2.4.0-alpha ----- v2.4.1-alpha
master ---   A      ---------------------   B  ---------------> C
              \                            / \                 /
                --- new_feature_branch ----    --- bug_fix ---
```


## Smoke testing

- Open the CDN version in different browsers and check everything is working as expected.
- The Npm version is a little different because you need to download and rebuild the example using the new `prerelease` version.
  - TIP: you can just run `npm start` to have everything working.