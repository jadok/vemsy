import { BaseStyle } from './interpreters/style'
import { BaseTemplate } from './interpreters/template'

export abstract class BasePage {
  public regex: string = ''

  public style!: BaseStyle
  public generalStyle!: BaseStyle

  public template!: BaseTemplate
}
