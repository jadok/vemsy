export default class Page {
  constructor(route = '', template = null, plugins = [], style = null, generalStyle = null, name = '') {
    this.route = route
    this.plugins = plugins
    this.template = template
    this.style = style
    this.generalStyle = generalStyle
    this.name = name
  }
}
