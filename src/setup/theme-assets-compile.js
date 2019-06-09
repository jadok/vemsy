import { Task } from 'middleware-setup'
const chalk = require('chalk');

import {
  compileStyleFiles,
  getStyleAssetsFromPages
} from '../style/page.js'

export default class extends Task {
  async execute() {
    // wait that all the style files are compiled
    try {
      const styles = getStyleAssetsFromPages(global.__app.theme.pages)
      await compileStyleFiles(__app.theme.style.manager, styles)
    }
    catch (err) {
      console.error(chalk.red(err))
    }
  }
}
