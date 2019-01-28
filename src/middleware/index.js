import data from './data.js'
import markdown from './markdown.js'
import render from './render.js'
import renderTheme from './render-theme.js'
import routingTheme from './routing-theme.js'
import { configureMiddleware } from './routing-file.js'

export default {
  data,
  markdown,
  render,
  renderTheme,
  routingFile: configureMiddleware,
  routingTheme
}
