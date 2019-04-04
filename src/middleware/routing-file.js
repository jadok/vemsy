import fs from 'fs'
import { join, sep } from 'path'
import util from 'util'

const stat = util.promisify(fs.stat)

export const routingFileMiddleware = (
  viewPath
) => async (req, res, next) => {
  if (typeof req.variables === 'undefined') {
    req.variables = {}
  }
  if (typeof req.hidden_variables === 'undefined') {
    req.hidden_variables = {}
  }
  // use the middleware if no file extension is provided
  if (req.originalUrl.indexOf('.') === -1) {
    // generate a windows readable path
    req.variables.file = viewPath + req.originalUrl.toString()
    try {
      const stats = await stat(req.variables.file + sep)
      req.variables.file = stats.isDirectory() ?
        join(viewPath, req.originalUrl.toString(), 'README.md')
        : join(viewPath, req.originalUrl.toString() + '.md')
    }
    catch (e) {
      req.variables.file = viewPath + req.originalUrl.toString() + '.md'
    }

  }
  else {
    req.variables.assetFile = req.originalUrl.toString()
  }
  return next()
}

export const configureMiddleware = () => routingFileMiddleware(__app.configs.files.app_path.contents)
