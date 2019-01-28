# Vemsy

Vemsy is build through a set of [tasks](https://www.npmjs.com/package/middleware-setup).
In Vemsy, the implementation of a Task is called a [setup](https://github.com/jadok/vemsy/tree/master/src/setup/index.js)
Each task is executed one after another (it is a list of Promises).
The tasks setup data in the `global.__app`

## Custom express middleware

It is possible to create your own express middleware and chose the implementation order through the [app/index.js](https://github.com/jadok/vemsy/tree/master/example/app/index.js) file.

You have 2 possibilities to add a custom express middleware by adding it to the array used to construct the expressMiddleware _setup_ :

- follow the express middleware [signing function](https://github.com/jadok/vemsy/tree/master/src/type/middleware.js)
- create a function that will return the express middleware signing function (see [example](https://github.com/jadok/vemsy/tree/master/src/middleware/routing-file.js))

## Theme

### Page

The list of middleware give you the ability to set custom middleware / variable to give to your page. Those middleware will be executed after the general middleware set with the [express middleware Task](https://github.com/jadok/vemsy/tree/master/src/setup/express-middleware.js) implemented in the [index.js](https://github.com/jadok/vemsy/tree/master/example/app/index.js)

### Template

A [Template](https://github.com/jadok/vemsy/tree/master/src/type/template.js) defined :

- template file (twig by default)
- a list of middleware

The list of middleware give you the ability to set custom middleware / variable to give to your template. Those middleware will be executed after the page middleware.
