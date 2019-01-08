export const routingFileMiddleware = (
  viewPath
) => (req, res, next) => {
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
  return next()
}

export const configureMiddleware = () => routingFileMiddleware(app.configs.files.app_path.contents)
