# Contributing to CTO UI
Contributing is easy:
1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Create a new branch `git checkout -b MY_BRANCH_NAME`
3. Install yarn: `npm install -g yarn`
4. Install the dependencies: `yarn`
5. Run `yarn start` to build and watch for code changes
6. The development branch is `master` (this is the branch pull requests should be made against).

## To run tests
Once you made your changes, you can add some tests in the `test` folder to make sure that everything behaves normally. Then, you can run the tests by using:
```sh
yarn test
```
> If you need to update the snapshots (but make sure that the output is correct), simply append the `-u` argument.

## Working with the CLI
You can work with the CLI by linking the project:
```sh
yarn link
```