import { join } from 'path'

import { IStyleCompiler } from './style'

import { SassStyle } from './sassStyle'

export class StyleManager {
  public compilers: IStyleCompiler[] = []
  public themePath: string = ''
  public publicPath: string = ''

  constructor(themePath: string, publicPath: string) {
    this.themePath = themePath
    this.publicPath = publicPath
  }

  /**
   * Defined all the compiler.
   */
  public setCompilers(): void {
    this.compilers.push(new SassStyle())
  }

  /**
   * Compile the filename with all the compiler matching the file.
   *
   * @param filename
   *  filename to be compiled.
   */
  public compile(filename: string): IStyleCompiler[] {
    const fileDirs = filename.split('/')
    const srcTheme: string = join(this.themePath, ...fileDirs.slice(0, fileDirs.length - 1))
    const matchedCompilers = this.compilers
      .reduce((acc: IStyleCompiler[], curr: IStyleCompiler) => {
        if (curr.matchExtension(filename)) {
          return [curr]
        }
        return acc
      }, [])
    matchedCompilers
      .forEach((compiler: IStyleCompiler) =>
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
  public resolver(filename: string): string {
    return this.compilers
      .reduce((acc: string, curr: IStyleCompiler) => {
        if (curr.matchExtension(filename)) {
          return curr.resolver(filename)
        }
        return acc
      }, '')
  }
}
