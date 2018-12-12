const { addCustomTypes, t } = require('typy')

const middlewareTypeCheck = require('./middleware.js')

addCustomTypes({
  isExpressMiddleware: middlewareTypeCheck
})

module.exports = t
