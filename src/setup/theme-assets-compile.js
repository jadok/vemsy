import { Task } from 'middleware-setup'
const chalk = require('chalk');

import { getStyleFilesFromPages } from '../style/page.js'

export default class extends Task {
  async execute() {
    // wait that all the style files are compiled
    try {
      await getStyleFilesFromPages(__app.theme.style.manager, global.__app.theme.pages)
    }
    catch (err) {
      console.error(chalk.red(err))
    }
  }
}
