import { getAssetPathFromPage } from '../utils/path.js'

const renderTemplateMiddleware = (req, res) => {
  const pageRendered = req.hidden_variables.pages[0]
  const template = getAssetPathFromPage(
    pageRendered.name,
    pageRendered.template.filename + pageRendered.template.extension
  )
  res.render(template, req.variables)
}

export default renderTemplateMiddleware
