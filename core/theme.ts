import { Express, Response } from 'express'
import * as path from 'path'

const includeAll = require('include-all')

import { readFile } from './interpreters/style'

import { factoryMotor, IViewTemplate } from './template/motor/factory_motor'

import filePathToPath from './utils/path'
import { testRoutes } from './utils/route-like-page'

const themeAttributes = (key: string, type: string) => key.charAt(0).toUpperCase() + key.slice(1) + type

const checkSubVars = (obj: any, key: string, attribute: string) => {
  return (
    typeof obj[key] === 'object'
    && obj[key].hasOwnProperty(attribute)
  )
}

/**
 * Responsability:
 * - theme configuration manager
 * - store interpreters
 * - store pages
 * - page resolver
 * -- style resolver
 * -- template resolver
 */
export class ThemeManager {
  public configs: any = {}
  public publicFiles: string = './'
  public name: string
  public motor: IViewTemplate
  public pages: any = {}
  public path: string = ''

  constructor(app: Express, configs: any) {
    this.name = configs.theme_name
    this.path = path.join(filePathToPath(configs.app_path.themes), this.name)
    this.motor = factoryMotor(configs.theme_motor, app, path.join(this.path, 'views'))
    this.configurePages()
    this.loadPages()
  }

  public configurePages() {
    this.configs.pages = includeAll({
      dirname: path.join(this.path, 'pages'),
      excludeDirs: /^\.(git|svn)$/,
      filter: /(.+)\.ts$/,
      optional: true
    })
  }

  public loadPages(configs: any = this.configs.pages) {
    Object.keys(configs).forEach((key: any) => {
      const attribute = themeAttributes(key, 'Page')
      if (!checkSubVars(configs, key, attribute)) {
        this.loadPages(configs[key])
      }
      else {
        const page = new configs[key][attribute]()
        if (this.pages.hasOwnProperty(page.regex)) {
          console.error(`The regex ${page.regex} already has a page defined.`)
        }
        else {
          this.pages[page.regex] = page
        }
      }
    });
  }

  public prepareVariables(req: any, globalStyle: any, styles: any[]) {
    const title: string[] = req.path.split('/')
    req.variables.globalStyle = globalStyle
    req.variables.styles = styles
    req.variables.title = title[title.length - 1]
    req.variables.md_data = req.markdown
  }

  public pageResolver(req: any, res: Response) {
    const paths = testRoutes(Object.keys(this.pages), req.path)
    let globalStyle: any = null
    let template: any = null
    const styles: any[] = []
    paths.forEach((myPath: string) => {
      if (this.pages[myPath].template !== null) {
        template = this.pages[myPath].template
      }
      if (!globalStyle && this.pages[myPath].generalStyle) {
        globalStyle = readFile(this.pages[myPath].generalStyle)
        styles.slice(0, styles.length)
        styles.push(readFile(this.pages[myPath].style))
      }
      else {
        styles.push(readFile(this.pages[myPath].style))
      }
    })
    this.prepareVariables(req, globalStyle, styles)
    res.render(template.file, req.variables)
  }

}
