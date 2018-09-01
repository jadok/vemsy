import { BaseStyle } from './interpreters/style'
import { BaseTemplate } from './interpreters/template'

export abstract class BasePage {
  public regex: string

  public style: BaseStyle = null
  public generalStyle: BaseStyle = null

  public template: BaseTemplate
}
