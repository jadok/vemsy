import { join } from 'path'

import { IStyleCompiler } from './style'
import compileSass from './compiler/sass/sass'

export class SassStyle implements IStyleCompiler {
  public matchExtension(filename: string) {
    const extension = filename.slice(filename.indexOf('.') + 1)
    return ['sass', 'scss'].includes(extension)
  }
  public compile(fileDirs: string[], srcTheme: string, publicPath: string) {
    const fullFileName = fileDirs[fileDirs.length - 1]
    const distPath: string = join(publicPath, 'css', ...fileDirs)
    compileSass(fullFileName, srcTheme, distPath)
  }
  public resolver(filename: string) {
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
