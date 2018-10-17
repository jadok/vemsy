# Contributing to Vemsy

Please take a moment to review this document in order to structure the contributing process and make everyone have the same.

## Submitting Issues / Feature

You are welcome to add new features or fix issues. Right now, the boilerplate has the list of the features and their implementation details in the `cli/.setup-folder/app/contents/`, keep this section updated with the code you are submitting. Documentation in the code should still be added.

## Using issues tracker

The [issue tracker](https://github.com/jadok/vemsy/issues) is the preferred chanel for spelling mistakes, errors, new feature or any general feedback. If you want to work on an issue, add a comment in stating your interest so everyone know you are working on it and avoid duplicated PRs.

## Pull request

Check out the [development environment](https://github.com/jadok/vemsy/tree/master/cli/.setup-folder/app/contents/DevEnv.md).

Please adhere to the coding conventions used throughout the project (spelling, indentation, punctuation etc.).

Adhering to the following process is the best way to get your work included in the project:

1. [Fork](https://help.github.com/articles/fork-a-repo) the project, clone your fork, and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/vemsy.git
   # Navigate to the newly cloned directory
   cd full-stack-interview
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/jadok/vemsy.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream master
   ```

5. Squash your commits down to a single one (we want to keep the master branch nice and clean)

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description.

## Code of Conduct

Please note our Code of Conduct and follow it in all your interactions with the project.

IMPORTANT: By submitting patches, you agree to allow the project owners to license your work under the terms of the [MIT License](https://github.com/jadok/vemsy/blob/LICENSE.md).
