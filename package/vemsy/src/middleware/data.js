const fs = require('fs')
const util = require('util')

const filePathToPath = require('../utils/path.js')
const asyncHandler = require('../utils/async.js')

const readFile = util.promisify(fs.readFile)

const dataMiddleware = async (req, res, next) => {
  if (!req.variables.file) {
    return next()
  }
  try {
    const filePath = req.variables.file
    const data = await readFile(filePathToPath(filePath), 'utf-8')
    req.variables.data = data
  }
  catch (e) {
    console.error(e, req.variables, req.variables.file)
    req.variables.data = ''
  }
  return next()
}

module.exports = asyncHandler(dataMiddleware)
