import factory from './factory'

const compile = (
  themePath: string,
  src: string[],
  publicPath: string,
  type: string = 'css'
) => {
  src.forEach((styleFile: string) => {
    factory(themePath, styleFile, publicPath, type)
  })
}

export default compile
