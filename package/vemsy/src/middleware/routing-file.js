const routingFileMiddleware = (
  viewPath
) => (req) => {
  if (typeof req.variables === 'undefined') {
    req.variables = {}
  }
  // use the middleware if no file extension is provided
  if (req.originalUrl.indexOf('.') === -1) {
    // generate a windows readable path
    req.variables.file = viewPath + req.originalUrl.toString() + '.md'
  }
  else {
    req.variables.assetFile = req.originalUrl.toString()
  }
}

const configureMiddleware = () => routingFileMiddleware(app.configs.files.app_path.contents)

module.exports = {
  configureMiddleware,
  routingFileMiddleware
}
