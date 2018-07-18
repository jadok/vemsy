import * as express from 'express'
import * as path from 'path'

const includeAll = require('include-all')

// import * as fileConfig from './config/files'

import ConfigFile from './config'
import { defineContentReader } from './content/md'

import Twig from './template/motor/twig_motor'

import filePathToPath from './utils/path'

/**
 * Express constructor
 */
class App {
  public express: express.Express
  public configs: any = {}
  public twig: Twig

  /**
   * Set up express and middleware
   */
  constructor() {
    this.express = express()
    this.setConfigFiles()
    this.setViewEngine()
    this.twig = new Twig(
      this.express,
      filePathToPath(this.configs.files.get('app_path').views)
    )
    this.routes()
  }

  public setConfigFiles() {
    const files: ConfigFile = new ConfigFile(
      filePathToPath('./core/configs/files.json'),
      filePathToPath('./app/configs/files.json')
    )
    const configs: any = includeAll({
      dirname     :  path.join(process.cwd(), 'app', 'configs'),
      excludeDirs :  /^\.(git|svn)$/,
      filter      :  /(.+)\.json$/,
      optional    :  true
    })
    console.log('Config', configs)
    this.configs.files = files
    console.log('app_path', this.configs.files.get('app_path'))
  }
  /**
   * Set Principal template
   */
  public setViewEngine() {
    this.express.use(
      defineContentReader(
        filePathToPath(this.configs.files.get('app_path').contents)
      )
    )
  }

  public routes() {
    this.express.get('/*', (req: any, res: express.Response) => {
      const title: string[] = req.path.split('/')
      res.render('root.html.twig', {
        md_data: req.markdown,
        title: title[title.length] || title[title.length - 1]
      })
    })
  }
}

export default new App().express
