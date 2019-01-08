import config from './config.js'
import express from './express.js'
import expressMiddleware from './express-middleware.js'
import globalLibrary from './global-library.js'
import lift from './lift.js'
import logger from './logger.js'

global.app = {}

export default {
  config,
  express,
  expressMiddleware,
  globalLibrary,
  lift,
  logger
}
