# Development environment

Vemsy is a library and a cli package. This makes it harder to test.
To solve this issue a 'dev environment' is provided through docker.

## Definition

| Name | explanation |
| ---- | ----------- |
| app  | The application generated from vemsy cli and using vemsy library |
| project | the source code of the library and the cli |

## Manual development environment

Before going through docker, let us go back to what is needed to test the whole app by doing it step by step.

### compile library

The source code of the library is in the `core` folder, it is written in Typescript and some Json are used as configuration files.

The compilation is done by using the script `npm run build:project`, it will create a `dist` folder with the `index.js` file at the root as the entrypoint of the library, it has it type as well `index.d.ts`.

### compile command-line

The source code of the library is in the `cli` folder, it is written in Typescript and the `.setup-folder` contains the folder structures.

### global install

Npm provide a way to install globally a package `npm link` with this it will be possible to install in another folder the app by executing `vemsy`

### update app

The boilerplate install your app but the project is required as a common package, to make it work on a local package it required to specify the path of the project.

In another folder execute : `vemsy` and then `npm instal -S /path/of/the/project/vemsy/`

_PS: You do not need to re install the bootstrap if you did not update the cli or the setup-folder folders / files._

### Execute the app

By default, typescript is compiled and executed on the fly with [ts-node](http://npmjs.com/package/ts-node), if you prefer you can compile it with `tsc`, though the easiest way to execute it is with `ts-node`.

`node index.js`

## Docker development environment

Both docker images are based on ubuntu with the installation of nodejs on top of it.

### vemsy_compile

A Docker image is made for compiling the project with [gulp](https://npmjs.com/package/gulp).
It use as the gulp configs in the `gulp` folder.
This image with compile the `core`and `cli` folders in their respective output folders `dist` et `bin`.

### vemsy_app

A Docker image is made to launch the implementation of the app.

This image :

- used the output folders of vemsy_compile
- install globally the library*
- use the cli to generate the boilerplate of the app
- execute the app in watch mode ([pm2](https://npmjs.com/package/pm2))

*If the cli has been updated, the image should be regenerate right now.

### Use it

The 2 docker images are built by `build.sh` and then a docker-compose mount the images.
The script `run.sh` do both things.

**Before using it be sure to compile once the code `npm run build:all`**
