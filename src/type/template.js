export default class Template {
  constructor(filename = '', plugins = [], extension = '') {
    this.filename = filename
    this.plugins = plugins
    this.extension = extension
  }
}
