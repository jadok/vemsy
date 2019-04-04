import { basename, dirname, extname, join } from 'path'

import { sassCompile } from './compiler.js'
import IStyleManager from '../istyle-manager.js'
import fs from 'fs'

export default class SassStyle extends IStyleManager {
  constructor(props) {
    super(props)
    this.matchExtensions = ['sass', 'scss']
  }

  /**
   * Check if the file is a sass file.
   *
   * @inheritdoc
   */
  isMatchedExtension = (filename) => {
    // remove '.' from extname return
    const extension = extname(filename).slice(1)
    return this.matchExtensions.includes(extension)
  }

  destinationCompiledFile = (fullFileName, publicPath) => {
    const distPath = join(publicPath, 'css', dirname(fullFileName))
    const filename = basename(fullFileName).split('.')[0]
    const dist = join(distPath, filename + '.css')
    return {
      fullFileName,
      distPath,
      dist
    }
  }

  /**
   * Compile a sass file into a css file.
   *
   * @inheritdoc
   */
  compile = async (fullFileName, srcTheme, publicPath) => {
    const output = this.destinationCompiledFile(fullFileName, publicPath)
    fs.mkdirSync(output.distPath, { recursive: true })
    return sassCompile(output.fullFileName, srcTheme, output.dist)
  }

  /**
   * @inheritdoc
   */
  resolver = (fullFileName) => {
    const output = this.destinationCompiledFile(fullFileName, '/')
    return output.dist
  }
}
