export default class Page {
  constructor(route = '', template = null, plugins = [], name = '') {
    this.route = route
    this.plugins = plugins
    this.template = template
    this.name = name
  }
}
