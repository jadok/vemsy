import { Express } from 'express'

import TemplateMotor from './template_motor'
import TwigMotor from './twig_motor'

export interface IViewTemplate {
  path: string
  motor: TemplateMotor
}

export const factoryMotor = (path: string, app: Express, viewPath: string): IViewTemplate | null => {
  const extensionPosition = path.indexOf('.')
  const extension = path.substr(extensionPosition)
  switch (extension) {
    case '.twig': {
      const factoryInstance = {
        motor: new TwigMotor(app, viewPath),
        path
      }
      return factoryInstance
    }
    default: return null
  }
}
