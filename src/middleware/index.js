import data from './data.js'
import markdown from './markdown.js'
import render from './render.js'
import routingFile from './routing-file.js'

export default {
  data,
  markdown,
  render,
  routingFile: routingFile.configureMiddleware
}
