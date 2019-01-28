const { middleware, runner, setup } = require('vemsy')

// convert the lists of setup which are objects in array values for the runner.
const instances = [
  // add the configurations files in app.configs
  setup.config,

  // // add all the global libraries
  setup.globalLibrary,

  // init express server
  setup.express,

  // add logs to express
  setup.logger,

  setup.themeInit,
  setup.themePages
].map((setupClass) => new setupClass())

// add middlewares to express
instances.push(new setup.expressMiddleware([
  middleware.routingFile,
  middleware.data,
  middleware.markdown,
  middleware.routingTheme,
  middleware.renderTheme
]))

// launch the app
instances.push(new setup.lift())

runner(instances)
  .then(() => {
    console.log('APP has been setup')
  })
