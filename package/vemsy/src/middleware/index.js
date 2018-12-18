const data = require('./data.js')
const markdown = require('./markdown.js')
const render = require('./render.js')
const routingFile = require('./routing-file.js')

module.exports = {
  data,
  markdown,
  render,
  routingFile: routingFile.configureMiddleware
}
