import data from './data.js'
import markdown from './markdown.js'
import renderTheme from './render-theme.js'
import routingTheme from './routing-theme.js'
import { configureMiddleware } from './routing-file.js'

export default {
  data,
  markdown,
  renderTheme,
  routingFile: configureMiddleware,
  routingTheme
}
