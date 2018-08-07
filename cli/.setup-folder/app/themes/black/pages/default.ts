import { BasePage } from 'vemsy'
import { MainStyle } from '../interpreters/style/main'
import { DefaultTemplate } from '../interpreters/template/default'

export class DefaultPage extends BasePage {
  public regex = '/'
  public style = new MainStyle()
  public template = new DefaultTemplate()
}
