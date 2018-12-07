const config = require('./config.js')
const express = require('./express.js')
const expressMiddleware = require('./express-middleware.js')
const lift = require('./lift.js')
const logger = require('./logger.js')

global.app = {}

module.exports = {
  config,
  express,
  expressMiddleware,
  lift,
  logger
}
