# Development environment

Vemsy is a library and a cli package. This makes it harder to test.
To solve this issue a 'dev environment' is provided through docker.

## Manual development environment

Before going through docker, let us go back to what is needed to test the whole app by doing it step by step.

### compile library

The source code of the library is in the `core` folder, it is written in Typescript and some Json are used as configuration files.

The compilation is done by using the script `npm run build:project`, it will create a `dist` folder with the `index.js` file at the root as the entrypoint of the library, it has it type as well `index.d.ts`.

### compile command-line

The source code of the library is in the `cli` folder, it is written in Typescript and the `.setup-folder` contains the folder structures.
