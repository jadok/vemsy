import { join } from 'path'

export abstract class BaseStyle {
  public file: string
  public media?: string = 'all'
  public priority?: string = undefined
}

export const readFile: any = (src: BaseStyle) => {
  const interpretedStyle: BaseStyle = { ...src }
  interpretedStyle.file = join(
    '/',
    'css',
    interpretedStyle.file.substr(
      0,
      interpretedStyle.file.indexOf('.')
    ) + '.css'
  )
  return interpretedStyle
}
