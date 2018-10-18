import { join } from 'path'

import { sassCompile, sassResult } from './compiler/sass'
import { IStyleCompiler } from './style'

export class SassStyle implements IStyleCompiler {
  /**
   * Check if the file is a sass file.
   *
   * @inheritdoc
   */
  public matchExtension(filename: string) {
    const extension = filename.slice(filename.indexOf('.') + 1)
    return ['sass', 'scss'].includes(extension)
  }

  /**
   * Compile a sass file into a css file.
   *
   * @inheritdoc
   */
  public compile(fileDirs: string[], srcTheme: string, publicPath: string): void {
    const fullFileName = fileDirs[fileDirs.length - 1]
    const distPath: string = join(publicPath, 'css', ...fileDirs.slice(0, fileDirs.length - 1))
    const filename = fullFileName.split('.')[0]
    const dist = join(distPath, filename + '.css')
    sassCompile(fullFileName, srcTheme, dist, sassResult(dist))
  }

  /**
   * @inheritdoc
   */
  public resolver(filename: string): string {
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
