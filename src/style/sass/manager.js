import { join } from 'path'

import { sassCompile } from './compiler.js'
import IStyleManager from '../istyle-manager.js'

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
    const extension = filename.slice(filename.indexOf('.') + 1)
    return this.matchExtensions.includes(extension)
  }

  destinationCompiledFile = (fileDirs, publicPath) => {
    const fullFileName = fileDirs[fileDirs.length - 1]
    const distPath = join(publicPath, 'css', ...fileDirs.slice(0, fileDirs.length - 1))
    const filename = fullFileName.split('.')[0]
    const dist = join(distPath, filename + '.css')
    return {
      fullFileName,
      dist
    }
  }

  /**
   * Compile a sass file into a css file.
   *
   * @inheritdoc
   */
  compile = async (fileDirs, srcTheme, publicPath) => {
    const output = this.destinationCompiledFile(fileDirs, publicPath)
    return sassCompile(output.fullFileName, srcTheme, output.dist)
  }

  /**
   * @inheritdoc
   */
  resolver = (filename) => {
    return join(
      '/',
      'css',
      filename.substr(
        0,
        filename.indexOf('.')
      ) + '.css'
    )
  }
}
