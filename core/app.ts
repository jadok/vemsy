import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as markdown from 'markdown'
import * as pathToRegexp from 'path-to-regexp'

import templates from './template'

class App {
  public express: any
  public baseTemplate: string = './app/templates/'
  public extensionTemplate: string = '.md'
  public routes: string[] = []

  constructor () {
    this.express = express()
    this.routesName()
    this.mountRoutes()
  }

  private routesName (): void {
    const files = templates(this.baseTemplate)
    const re = pathToRegexp(this.baseTemplate.substr(2) + ':path*' + this.extensionTemplate)
    this.routes = files.map((file: string) => {
      return re.exec(file)[1]
    })

  }

  private mountRoutes (): void {
    const router = express.Router()
    this.routes.forEach((route: string) => {
      const pathFile = path.join('./', this.baseTemplate, route + this.extensionTemplate)
      fs.readFile(
        pathFile, 'utf8', (err: NodeJS.ErrnoException, data: string): void => {
        if (err) {
          console.log(err);
          return
        }
        router.get(`/${route}`, (req, res) => {
          res.send(markdown.markdown.toHTML(data))
        })
      })
    })
    this.express.use('/', router)
  }
}

export default new App().express