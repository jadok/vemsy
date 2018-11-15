// Base imports
import { BaseStyle } from '../../core/interpreters/style'
import { BaseTemplate } from '../../core/interpreters/template'
import { BasePage } from '../../core/page'

// Tests imports
import TestStyle from './TestStyle'
import TestTemplate from './TestTemplate'

export default class Testpage extends BasePage {
  public regex: string = '/'
  public template: BaseTemplate = new TestTemplate()
  public style: BaseStyle = new TestStyle()
}
