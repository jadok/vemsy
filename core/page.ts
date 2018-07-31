import { Express } from 'express'

import { factoryMotor, IViewTemplate } from './template/motor/factory_motor'

import { BaseStyle } from './interpreters/style'
import { BaseTemplate } from './interpreters/template'

interface IPageParameter {
  app: Express
  filepath: string,
  regex: string,
  viewPath: string
}

/*
class PageOld {
  public regex: string

  public viewTemplating: IViewTemplate

  constructor(params: IPageParameter) {
    this.regex = params.regex
    this.viewTemplating = factoryMotor(params.filepath, params.app, params.viewPath)
  }

}
*/

export abstract class BasePage {
  public regex: string

  public style: BaseStyle = null
  public generalStyle: BaseStyle = null

  public template: BaseTemplate
}
