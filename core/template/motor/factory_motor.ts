import { Express } from 'express'

import TemplateMotor from './template_motor'
import TwigMotor from './twig_motor'

export interface IViewTemplate {
  motor: TemplateMotor
}

export const factoryMotor = (type: string, app: Express, viewPath: string): IViewTemplate | null => {
  switch (type) {
    case 'twig': {
      const factoryInstance = {
        motor: new TwigMotor(app, viewPath)
      }
      return factoryInstance
    }
    default: return null
  }
}
