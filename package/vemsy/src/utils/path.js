const { join } = require('path')

const filePathToPath = (filePath) =>
  join(process.cwd(), ...filePath.split('/'))

module.exports = filePathToPath
