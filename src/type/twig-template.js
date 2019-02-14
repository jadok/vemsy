import Template from './template.js'

export default class TwigTemplate extends Template {
  constructor(filename = '', plugins = []) {
    super(filename, plugins, '.html.twig')
  }
}
