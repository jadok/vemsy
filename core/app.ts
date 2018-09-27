import * as express from 'express'
import * as path from 'path'
const includeAll = require('include-all')
const morgan = require('morgan');
const winston = require('winston')

import './json'

import { mergeConfiguration } from './config'
import * as systemConfigs from './configs/files.json'
import * as logsConfigs from './configs/loger.json'

import { defineContentReader } from './content/md'
import { ThemeManager } from './theme'
import { arrayUnique } from './utils/array'
import filePathToPath from './utils/path';

interface ILogs {
  name: string;
  date: Date;
}

const globalAny: any = global

/**
 * Express constructor
 */
export class App {
  public express: express.Express
  public configs: any = {}
  public theme: ThemeManager | null = null

  /**
   * Set up express and middleware
   */
  constructor() {
    globalAny.logs = []
    globalAny.logs.push({
      date: new Date(),
      name: 'App constructor'
    })
    //  logs.push()
    this.express = express()
    this.setConfigFiles()
    this.setLoggers()
    this.setPublic()
    this.setContentEngine()
    this.setTheme()
    this.routes()

    const initDate = globalAny.logs[0].date
    globalAny.logs.forEach((action: ILogs) => {
      console.log(`${action.name}:  ${(action.date.valueOf() - initDate.valueOf())}ms`)
    })
    console.log(`Bootstraped in ${(new Date()).valueOf() - initDate.valueOf()}ms`)
  }

  public setLoggers() {
    const configFile = this.configs.global.logs.winston.file
    configFile.filename = filePathToPath(configFile.filename)
    const logger = winston.createLogger({
      exitOnError: false, // do not exit on handled exceptions
      transports: [
        new winston.transports.File(configFile),
        new winston.transports.Console(this.configs.global.logs.winston.console)
      ],
    });
    logger.stream = {
      write: (message: string) => {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
      },
    };
    this.express.use(morgan((tokens: any, req: express.Request, res: express.Response) => {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
      ].join(' ')
    }, { stream: logger.stream }))
    globalAny.logs.push({
      date: new Date(),
      name: 'App middleware logs'
    })
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
      files: systemConfigs,
      logs: logsConfigs
    }
    this.configs.global = arrayUnique(Object.keys(configs).concat(Object.keys(coreConfigs)))
      .reduce((accumulator: any, key: any) => {
        accumulator[key] = mergeConfiguration(coreConfigs[key], configs[key])
        return accumulator
      }, {})
    console.log('Configs Files Loaded')
    globalAny.logs.push({
      date: new Date(),
      name: 'App Config Files Loaded'
    })
  }

  public setPublic() {
    console.log('setting static dir')
    this.express.use(
      express.static(
        this.configs.global.files.app_path.public
      )
    )
    globalAny.logs.push({
      date: new Date(),
      name: 'App public folder'
    })
  }

  public setTheme() {
    console.log('setting theme')
    this.theme = new ThemeManager(
      this.express,
      this.configs.global.files
    )
    globalAny.logs.push({
      date: new Date(),
      name: 'App init Theme'
    })
  }

  /**
   * Set Principal template
   */
  public setContentEngine() {
    console.log('setting ContentEngine')
    this.express.use(
      defineContentReader(
        this.configs.global.files.app_path.contents
      )
    )
    globalAny.logs.push({
      date: new Date(),
      name: 'App set content engine'
    })
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
    globalAny.logs.push({
      date: new Date(),
      name: 'App set routes'
    })
  }
}
