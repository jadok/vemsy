# Vemsy

Vemsy is build through a set of [tasks](https://www.npmjs.com/package/middleware-setup).
In Vemsy, the implementation of a Task is called a [setup](https://github.com/jadok/vemsy/tree/master/src/setup/index.js)

## Custom express middleware

It is possible to create your own express middleware and chose the implementation order through the [app/index.js](https://github.com/jadok/vemsy/tree/master/example/app/index.js) file.

You have 2 possibilities to add a custom express middleware by adding it to the array used to construct the expressMiddleware _setup_ :

- follow the express middleware [signing function](https://github.com/jadok/vemsy/tree/master/src/type/middleware.js)
- create a function that will return the express middleware signing function (see [example](https://github.com/jadok/vemsy/tree/master/src/middleware/routing-file.js))

