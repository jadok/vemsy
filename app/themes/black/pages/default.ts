import { BasePage } from '../../../../core/page'
import { MainStyle } from '../interpreters/style/main'
import { DefaultTemplate } from '../interpreters/template/default'

module.exports = {
  DefaultPage: class DefaultPage extends BasePage {
    public regex = '/'
    public style = new MainStyle()
    public template = new DefaultTemplate()
  }
}
