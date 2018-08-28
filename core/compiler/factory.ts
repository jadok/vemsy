import { join } from 'path'

import compileSass from './sass'

const factory: any = (
  themePath: string,
  src: string,
  publicPath: string,
  type: string = 'css'
) => {
  const fileExtension: string = src.slice(src.indexOf('.') + 1)
  const srcTheme: string = join(themePath, ...src.split('/'))
  const distPath: string = join(publicPath, type, ...src.split('/'))
  switch (fileExtension) {
    case 'scss':
    case 'sass': {
      compileSass(srcTheme, distPath)
    }
  }
}

export default factory
