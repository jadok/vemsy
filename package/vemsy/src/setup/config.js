const merge = require('deepmerge')
const includesAll = require('include-all')
const { Task } = require('middleware-setup')
const { join } = require('path')

const pathCoreConfigs = join(__dirname, '..', 'config')
const pathAppConfigs = join(process.cwd(), 'app', 'config')

module.exports = class extends Task {
  async execute() {
    try {
      const coreConfigs = includesAll({
        dirname: pathCoreConfigs,
        filter: /(.+)\.js$/,
        excludeDirs: /^\.(git|svn)$/
      })
      const appConfigs = includesAll({
        dirname: pathAppConfigs,
        filter: /(.+)\.js$/,
        excludeDirs: /^\.(git|svn)$/
      })

      global.app.configs = merge(coreConfigs, appConfigs)
    }
    catch (err) {
      throw new Error(err)
    }
  }
}
