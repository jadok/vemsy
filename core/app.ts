import * as express from 'express'

import * as fileConfig from './config/files'
import { defineContentReader } from './content/md'

import Twig from './template/motor/twig_motor'

class App {
  public express: express.Express
  public configs: any
  public twig: Twig

  constructor() {
    this.express = express()
    this.configs = fileConfig.default
    this.setViewEngine()
    this.twig = new Twig(this.express, this.configs.app_path.views)
    this.routes()
  }

  public setViewEngine() {
    this.express.use(defineContentReader(this.configs.app_path.contents))
  }

  public routes() {
    this.express.get('/*', (req: any, res: any) => {
      let title = req.path.split('/')
      title = title[title.lenght] || title[title.length - 1]
      res.render('root.html.twig', { md_data: req.markdown, title })
    })
  }
}

export default new App().express
