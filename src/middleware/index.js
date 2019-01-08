import data from './data.js'
import markdown from './markdown.js'
import render from './render.js'
import { configureMiddleware } from './routing-file.js'

export default {
  data,
  markdown,
  render,
  routingFile: configureMiddleware
}
