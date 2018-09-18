import { join } from 'path'

import compileSass from './sass'

const factory: any = (
  themePath: string,
  src: string,
  publicPath: string,
  type: string = 'css'
) => {
  const fileExtension: string = src.slice(src.indexOf('.') + 1)
  const fileDirs = src.split('/')
  const fullFileName = fileDirs[fileDirs.length - 1]
  const srcTheme: string = join(themePath, ...fileDirs)
  const distPath: string = join(publicPath, type, ...fileDirs)
  switch (fileExtension) {
    case 'scss':
    case 'sass': {
      compileSass(fullFileName, srcTheme, distPath)
    }
  }
}

export default factory
