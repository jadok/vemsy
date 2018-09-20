import { join } from 'path'

import { IStyleCompiler } from './style'

import { SassStyle } from './sass/sassStyle'

export class Compiler {
  public compiler: IStyleCompiler[] = []
  public themePath: string = ''
  public publicPath: string = ''

  constructor(themePath: string, publicPath: string,) {
    this.publicPath = themePath
    this.publicPath = publicPath
    this.setCompilers()
  }

  public setCompilers() {
    this.compiler.push(new SassStyle())
  }

  public compile(filename: string) {
    const fileDirs = filename.split('/')
    const srcTheme: string = join(this.themePath, ...fileDirs)
    this.compiler
      .reduce((acc: IStyleCompiler[], curr: IStyleCompiler) => {
        if (curr.matchExtension(filename)) {
          acc.push(curr)
        }
        return acc
      }, [])
      .forEach((compiler: IStyleCompiler) =>
        compiler.compile(fileDirs, srcTheme, this.publicPath))
  }
}
