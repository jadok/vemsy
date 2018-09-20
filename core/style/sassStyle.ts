import { join } from 'path'

import { sassCompile, sassResult } from './compiler/sass'
import { IStyleCompiler } from './style'

export class SassStyle implements IStyleCompiler {
  public matchExtension(filename: string) {
    const extension = filename.slice(filename.indexOf('.') + 1)
    return ['sass', 'scss'].includes(extension)
  }

  public compile(fileDirs: string[], srcTheme: string, publicPath: string) {
    const fullFileName = fileDirs[fileDirs.length - 1]
    const distPath: string = join(publicPath, 'css', ...fileDirs.slice(0, fileDirs.length - 1))
    const filename = fullFileName.split('.')[0]
    const dist = join(distPath, filename + '.css')
    console.log(dist)
    sassCompile(fullFileName, srcTheme, dist, sassResult(dist))
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
