import { getAssetPathFromPage } from '../utils/path.js'
import { testRoutes } from '../utils/route-like-page.js'

const renderTemplateMiddleware = (req, res, next) => {
  if (typeof req.hidden_variables !== 'undefined') {
    req.hidden_variables.pages = testRoutes(__app.theme.pages, req.path)
    const pageRendered = req.hidden_variables.pages[0]
    const template = getAssetPathFromPage(
      pageRendered.name,
      pageRendered.template.filename + pageRendered.template.extension
    )
    res.render(template, req.variables)
    return
  }
  return next()
}

export default renderTemplateMiddleware
