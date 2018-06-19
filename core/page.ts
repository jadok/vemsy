import { Express } from 'express'
import { factoryMotor, IViewTemplate } from './template/motor/factory_motor'

interface IPageParameter {
  app: Express
  filepath: string,
  regex: string,
  viewPath: string
}

class Page {
  /**
   * regex path of the page
   */
  public regex: string

  public viewTemplating: IViewTemplate

  constructor(params: IPageParameter) {
    this.regex = params.regex
    this.viewTemplating = factoryMotor(params.filepath, params.app, params.viewPath)
  }

}

export default Page
