import config from './config.js'
import express from './express.js'
import expressMiddleware from './express-middleware.js'
import globalLibrary from './global-library.js'
import lift from './lift.js'
import themeInit from './theme-init.js'
import themePages from './theme-pages.js'
import logger from './logger.js'

global.__app = {}

export default {
  config,
  express,
  expressMiddleware,
  globalLibrary,
  lift,
  logger,
  themeInit,
  themePages
}
