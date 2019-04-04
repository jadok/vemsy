const md = require('markdown-it');

import { Task } from 'middleware-setup'

export default class extends Task {
  /**
   * Constructor method
   *
   * @param {[[]]} plugins
   *   List of plugins args.
   *   In this array of array the sub array is the list of arguments for the plugin.
   *   The first one is the the plugin, the second one is the option of the plugin.
   */
  constructor(plugins) {
    super(plugins)
    this.plugins = plugins
  }
  async execute() {
    __app.markdown = md({
      html: false, // Enable HTML tags in source
      xhtmlOut: false, // Use '/' to close single tags (<br />).
                       // This is only for full CommonMark compatibility.
      breaks: false,   // Convert '\n' in paragraphs into <br>
      langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
                       // useful for external highlighters.
      linkify: false,  // Autoconvert URL-like text to links
      typographer: false
    });
    plugins.forEach((plugin) => {
      if (plugin && plugin.length) {
        __app.markdown.use(...plugin)
      }
    })
  }
}
