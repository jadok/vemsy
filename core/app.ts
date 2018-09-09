import * as express from 'express'
import * as path from 'path'
const includeAll = require('include-all')

import './json'

import { mergeConfiguration } from './config'
import * as systemConfigs from './configs/files.json'
import { defineContentReader } from './content/md'
import Twig from './template/motor/twig_motor'
import { ThemeManager } from './theme'
import { arrayUnique } from './utils/array'
import filePathToPath from './utils/path'

/**
 * Express constructor
 */
export class App {
  public express: express.Express
  public configs: any = {}
  public theme: ThemeManager | null = null
  public twig: Twig | null = null

  /**
   * Set up express and middleware
   */
  constructor() {
    this.express = express()
    this.setConfigFiles()
    this.setPublic()
    this.setViewEngine()
    this.setTheme()
    this.routes()
  }

  public setConfigFiles() {
    console.log('Loading Configs Files')
    const configs: any = includeAll({
      dirname: path.join(process.cwd(), 'app', 'configs'),
      excludeDirs: /^\.(git|svn)$/,
      filter: /(.+)\.ts$/,
      optional: true
    })
    const coreConfigs: any = {
      files: systemConfigs
    }
    this.configs.global = arrayUnique(Object.keys(configs).concat(Object.keys(coreConfigs)))
      .reduce((accumulator: any, key: any) => {
        accumulator[key] = mergeConfiguration(coreConfigs[key], configs[key])
        return accumulator
      }, {})
    console.log('Configs Files Loaded')
  }

  public setPublic() {
    console.log('setting static dir')
    this.express.use(
      express.static(
        this.configs.global.files.app_path.public
      )
    )
  }

  public setTheme() {
    console.log('setting theme')
    this.theme = new ThemeManager(
      this.express,
      this.configs.global.files
    )
  }

  /**
   * Set Principal template
   */
  public setViewEngine() {
    console.log('setting ViewEngine')
    this.express.use(
      defineContentReader(
        filePathToPath(this.configs.global.files.app_path.contents)
      )
    )
  }

  public routes() {
    console.log('setting route resolver')
    this.express.get('/*', (req: any, res: express.Response) => {
      console.log(req.originalUrl)
      if (req.originalUrl.indexOf('.') === -1 && this.theme !== null) {
        this.theme.pageResolver(req, res)
      }
      else {
        res.sendFile(req.path)
      }
    })
  }
}
