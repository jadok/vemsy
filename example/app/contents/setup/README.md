# Setup

Vemsy is build through a set of [tasks](https://www.npmjs.com/package/middleware-setup).
In Vemsy, the implementation of a Task is called a [setup](https://github.com/jadok/vemsy/tree/master/src/setup/index.js)
Each task is executed one after another (it is a list of Promises).
The tasks setup data in the `global.__app`

## List of Tasks

### [Config](./config.md)

### [Express](./express.md)

### [Express middlewares](./express-middleware.md)

### [Global library](./global-library.md)

### [Lift](./lift.md)

### [Logger](./loggger.md)

### [Theme init](../theme/setup/theme-init.md)

### [Theme pages](../theme/setup/theme-pages.md)
