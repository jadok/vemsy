import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as pathToRegexp from 'path-to-regexp'

const markdown = require('markdown')
const twig = require('twig').twig

import { Styles } from './link'
import Page from './page'
import templates from './template'

class App {
  public rootPath: string = './'
  public express: any
  public baseTemplate: string = 'app/templates/'
  public baseStyle: string = 'app/styles/'
  public baseView: string = 'app/views/'
  public publicPath: string = 'public/'
  public extensionTemplate: string = '.md'
  public routes: string[] = []
  public baseTwig: any
  public pages: Page[] = []

  constructor() {
    this.express = express()
    this.initTwig()
    this.initPage()
    this.initStyle()
    this.routesName()
    this.mountRoutes()
  }
  private initStyle() {
    const publicPath = path.join(this.rootPath, this.publicPath)
    this.express.use(path.join('/', publicPath), express.static(publicPath))
  }

  private initPage(): void {
    // add a default Page
    const defaultPage = new Page()
    const defaultStyle = new Styles(this.rootPath + this.baseStyle + 'index.scss')
    defaultPage.styles.push(defaultStyle)
    this.pages.push(defaultPage)
  }

  private routePage(pathName: string): Page | null {
    const pages = this.pages.filter((pageType: Page) => pageType.matchRoute(pathName))
    return pages.length ? pages[0] : null
  }
  private initTwig(): void {
    fs.readFile(
      path.join(this.rootPath, this.baseView, 'root.html.twig'),
      'utf8',
      (err: NodeJS.ErrnoException, data: string): void => {
        if (err) {
          console.error(err);
          return
        }
        this.baseTwig = twig({ data })
      }
    )
  }

  private routesName(): void {
    const files = templates(this.rootPath + this.baseTemplate)
    const re = pathToRegexp(this.baseTemplate + ':path*' + this.extensionTemplate)
    this.routes = files.map((file: string) => {
      return re.exec(file)[1]
    })
  }

  private mountRoutes(): void {
    const router = express.Router()
    this.routes.forEach((route: string) => {
      const pathFile = path.join(this.rootPath, this.baseTemplate, route + this.extensionTemplate)
      fs.readFile(
        pathFile, 'utf8', (err: NodeJS.ErrnoException, data: string): void => {
        if (err) {
          console.error(err);
          return
        }
        router.get(`/${route}`, (req: express.Request, res: express.Response) => {
          const routeInstance = this.routePage(route)
          const twigData = { md_data: markdown.markdown.toHTML(data), title: '', styles: '' }
          if (routeInstance) {
            routeInstance.beforeRender(data)
            // '# ' character defining the header in Markdown
            twigData.title = routeInstance.title.substr(2)
            twigData.styles = routeInstance.generateStyleLinks()
          }
          res.send(this.baseTwig.render(twigData))
        })
      })
    })
    this.express.use('/', router)
  }
}

export default new App().express
