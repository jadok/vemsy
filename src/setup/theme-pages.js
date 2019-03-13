const includesAll = require('include-all')
import { Task } from 'middleware-setup'
import { join } from 'path'

import routeInclude from '../utils/route-include.js'

export default class extends Task {
  async execute() {
    const themePagesDir = join(
      __app.configs.files.app_path.themes
      + '/' + __app.configs.files.theme_name
    )
    const tmpApp = { ...global.__app }
    const pages = includesAll({
      dirname: themePagesDir,
      filter: /(.+.page)\.js$/,
      excludeDirs: /^\.(git|svn)$/
    })
    console.log('Pages:', pages)
    global.__app = tmpApp
    global.__app.theme.pages = []
    routeInclude(pages, global.__app.theme.pages)
  }
}
