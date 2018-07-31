import * as express from 'express'
import * as path from 'path'

const includeAll = require('include-all')

import { mergeConfiguration } from './config'
import { defineContentReader } from './content/md'

import Twig from './template/motor/twig_motor'

import { arrayUnique } from './utils/array'
import filePathToPath from './utils/path'

import { ThemeManager } from './theme'

/**
 * Express constructor
 */
class App {
  public express: express.Express
  public configs: any = {}
  public theme: ThemeManager = null
  public twig: Twig

  /**
   * Set up express and middleware
   */
  constructor() {
    this.express = express()
    this.setConfigFiles()
    this.setPublic()
    this.setViewEngine()
    this.setTheme()
    /*
    this.twig = new Twig(
      this.express,
      filePathToPath(this.configs.global.files.app_path.views)
    )
    */
    this.routes()
  }

  public setConfigFiles() {
    const configs: any = includeAll({
      dirname: path.join(process.cwd(), 'app', 'configs'),
      excludeDirs: /^\.(git|svn)$/,
      filter: /(.+)\.ts$/,
      optional: true
    })
    const configsCore: any = includeAll({
      dirname: path.join(__dirname, 'configs'),
      excludeDirs: /^\.(git|svn)$/,
      filter: /(.+)\.ts$/,
      optional: true
    })
    this.configs.global = arrayUnique(Object.keys(configs).concat(Object.keys(configsCore)))
      .reduce((accumulator: any, key: any) => {
        accumulator[key] = mergeConfiguration(configsCore[key], configs[key])
        return accumulator
      }, {})

  }

  public setPublic() {
    const p = path.join(__dirname, '..', 'public')
    console.log(p)
    // this.express.use(express.static(this.configs.global.files.app_path.public))
    this.express.use(express.static(p));
  }

  public setTheme() {
    this.theme = new ThemeManager(
      this.express,
      this.configs.global.files
    )
  }

  /**
   * Set Principal template
   */
  public setViewEngine() {
    this.express.use(
      defineContentReader(
        filePathToPath(this.configs.global.files.app_path.contents)
      )
    )
  }

  public routes() {
    this.express.get('/*', (req: any, res: express.Response) => {
      console.log(req.originalUrl)
      if (req.originalUrl.indexOf('.') === -1) {
        this.theme.pageResolver(req, res)
      }
      else {
        res.sendFile(req.path)
      }
      /*
      const title: string[] = req.path.split('/')
      res.render('root.html.twig', {
        md_data: req.markdown,
        title: title[title.length] || title[title.length - 1]
      })
      */
    })
  }
}

export default new App().express
