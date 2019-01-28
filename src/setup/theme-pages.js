const includesAll = require('include-all')
import { Task } from 'middleware-setup'
import { join } from 'path'

export default class extends Task {
  async execute() {
    const themePagesDir = join(
      __app.configs.files.app_path.themes
      + '/' + __app.configs.files.theme_name
    )
    const tmpApp = { ...global.__app }
    const pages = includesAll({
      dirname: themePagesDir,
      filter: /(.+)\.js$/,
      excludeDirs: /^\.(git|svn)$/
    })
    global.__app = tmpApp
    global.__app.theme.pages = Object.keys(pages.pages).map((pageName) => {
      pages.pages[pageName].name = pageName
      return pages.pages[pageName]
    })
  }
}
