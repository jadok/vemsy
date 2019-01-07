import merge from 'deepmerge'
import includesAll from 'include-all'
import { Task } from 'middleware-setup'
import { join } from 'path'

import files from '../config/files.js'
import logs from '../config/logs.js'

const pathAppConfigs = join(process.cwd(), 'app', 'config')

export default class extends Task {
  async execute() {
    try {
      const coreConfigs = { files, logs }
      const appConfigs = includesAll({
        dirname: pathAppConfigs,
        filter: /(.+)\.js$/,
        excludeDirs: /^\.(git|svn)$/
      })

      global.app.configs = merge(coreConfigs, appConfigs)
      global.app.configs.name = global.app.configs.name || require(join(process.cwd(), 'package.json')).name
    }
    catch (err) {
      throw new Error(err)
    }
  }
}
