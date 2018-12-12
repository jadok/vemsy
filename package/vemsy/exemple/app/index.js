const { runner } = require('middleware-setup')
const { setup, middleware } = require('vemsy')

// convert the lists of setup which are objects in array values for the runner.
const instances = [
  // add the configurations files in app.configs
  setup.config,

  // add all the global libraries
  setup.globalLibrary,

  // init express server
  setup.express,

  // add logs to express
  setup.logger
].map((setupClass) => new setupClass())

// add middlewares to express
const middlewares = (() => {
  if (!(app.configs && app.configs.files.app_path.contents)) {
    console.error('configuration has not been set up.')
  }
  return new setup.expressMiddleware([
    middleware.routingFile(app.configs.files.app_path.contents),
    middleware.data,
    middleware.markdown
  ])
})()
instances.push(middlewares)

// launch the app
instances.push(new setup.lift())

runner(instances)
  .then(() => {
    console.log('APP has been setup')
    console.log(global.app.configs)
  })
