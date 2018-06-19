import * as express from 'express'

import * as fileConfig from './config/files'
import { defineContentReader } from './template/md'

class App {
  public express: express.Express
  public configs: any

  constructor() {
    this.express = express()
    this.configs = fileConfig.default
    this.setViewEngine()
  }

  public setViewEngine() {
    this.express.use(defineContentReader(this.configs.app_path.contents))
  }
}

export default new App().express
