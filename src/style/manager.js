import { join } from 'path'

import SassManager from './sass/manager.js'

export default class StyleManager {

  constructor(themePath, publicPath) {
    this.themePath = themePath
    this.publicPath = publicPath
    this.compilers = []
  }

  /**
   * Defined all the compiler.
   */
  setCompilers() {
    this.compilers.push(new SassManager())
  }

  /**
   * Compile the filename with all the compiler matching the file.
   *
   * @param filename
   *  filename to be compiled.
   */
  compile(filename) {
    const fileDirs = filename.split('/')
    const srcTheme = join(this.themePath, ...fileDirs.slice(0, fileDirs.length - 1))
    const matchedCompilers = this.compilers
      .reduce((acc, curr) => {
        if (curr.isMatchedExtension(filename)) {
          return [curr]
        }
        return acc
      }, [])
    matchedCompilers
      .forEach((compiler) =>
        compiler.compile(fileDirs, srcTheme, this.publicPath))
    return matchedCompilers
  }

  /**
   * Retreive the public path of a source file.
   *
   * @param filename
   *   filename of the style file.
   * @return
   *   public style path
   */
  resolver(filename) {
    return this.compilers
      .reduce((acc, curr) => {
        if (curr.isMatchedExtension(filename)) {
          return curr.resolver(filename)
        }
        return acc
      }, '')
  }
}
