import { Express } from 'express'

import ViewMotor from './view'
import TwigMotor from './twig'

export interface IViewTemplate {
  motor: ViewMotor
}

export const factoryView = (type: string, app: Express, viewPath: string): IViewTemplate | null => {
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
