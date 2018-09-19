import { IStyleCompiler } from './style'

import { SassStyle } from './sass/sassStyle'

export class Compiler {
  public compiler: IStyleCompiler[] = []
  public themePath: string = ''
  public publicPath: string = ''
  
  constructor(themePath: string, publicPath: string,) {
    this.publicPath = themePath
    this.publicPath = publicPath
  }

  public setCompiler() {
    this.compiler.push(new SassStyle())
  }
}
