import { dirname, join } from 'path'

export default class StyleManager {

  constructor(themePath, publicPath) {
    this.themePath = themePath
    this.publicPath = publicPath
    this.compilers = []
  }

  /**
   * Compile the filename with all the compilers matching the file.
   *
   * @param filename
   *  filename to be compiled.
   */
  async compile(filename) {
    const srcTheme = join(this.themePath, dirname(filename))
    const matchedCompilers = this.compilers
      .reduce((acc, curr) => {
        if (curr.isMatchedExtension(filename)) {
          return [curr]
        }
        return acc
      }, [])
      .map((compiler) =>
        compiler.compile(filename, srcTheme, this.publicPath))
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
