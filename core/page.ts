import { BaseStyle } from './interpreters/style'
import { BaseTemplate } from './interpreters/template'

export abstract class BasePage {
  public regex: string = ''

  public style: BaseStyle | null = null
  public generalStyle: BaseStyle | null = null

  public template: BaseTemplate | null = null
}
