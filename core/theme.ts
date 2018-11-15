import { Express } from 'express'
import { join } from 'path'

const includeAll = require('include-all')

import { factoryView, IViewTemplate } from './view/factory'

import { StyleManager } from './style/manager'

import { arrayUnique } from './utils/array'
import filePathToPath from './utils/path'
import { testRoutes } from './utils/route-like-page'

import { PageAssetsResolver } from './theme/pageAssetsResolver'

export const themeAttributes = (key: string, type: string) => key.charAt(0).toUpperCase() + key.slice(1) + type

export const checkSubVars = (obj: any, key: string, attribute: string) => {
  return (
    typeof obj[key] === 'object'
    && !obj[key].hasOwnProperty(attribute)
  )
}

/**
 * Responsibility:
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
  public motor: IViewTemplate | null
  public pages: any = {}
  public path: string = ''
  public styles: string[] = []
  public styleManager: StyleManager

  constructor(app: Express, configs: any) {
    this.name = configs.theme_name
    this.path = join(filePathToPath(configs.app_path.themes), this.name)
    this.motor = factoryView(configs.theme_motor, app, join(this.path, 'views'))
    this.styleManager = new StyleManager(
      join(this.path, 'styles'),
      filePathToPath(configs.app_path.public)
    )
    this.styleManager.setCompilers()
    this.configurePages()
    this.loadPages()
    this.compileStyles()
  }

  public configurePages() {
    this.configs.pages = includeAll({
      dirname: join(this.path, 'pages'),
      excludeDirs: /^\.(git|svn)$/,
      filter: /(.+)\.ts$/,
      optional: true
    })
  }

  public loadPages(configs: any = this.configs.pages) {
    console.log('Load pages')
    Object.keys(configs).forEach((key: any) => {
      const attribute = themeAttributes(key, 'Page')
      if (checkSubVars(configs, key, attribute)) {
        this.loadPages(configs[key])
      }
      else {
        const page = new configs[key][attribute]()
        if (this.pages.hasOwnProperty(page.regex)) {
          console.error(`The regex ${page.regex} already has a page defined.`)
        }
        else {
          console.log(`A page named '${attribute}' for the route: '${page.regex} has been defined'`)
          this.pages[page.regex] = page
          this.styles.push(page.style.file)
          if (page.generalStyle) {
            this.styles.push(page.generalStyle.file)
          }
        }
      }
    });
  }

  public compileStyles() {
    this.styles = arrayUnique(this.styles)
    this.styles
      .forEach((filename: string) => this.styleManager.compile(filename))
  }

  public prepareVariables(req: any, globalStyle: any, styles: any[]) {
    const title: string[] = req.path.split('/')
    req.variables.globalStyle = globalStyle
    req.variables.styles = styles
    req.variables.title = title[title.length - 1]
    req.variables.md_data = req.variables.markdown
  }

  public pageResolver(req: any, res: any) {
    const paths = testRoutes(Object.keys(this.pages), req.path)
    const resolver = new PageAssetsResolver(
      this.pages,
      paths,
      this.styleManager.resolver
    )
    const { globalStyle, template, styles } = resolver.resolve()
    this.prepareVariables(req, globalStyle, styles)
    res.render(template.file, req.variables)
  }
}
