import { getAssetPathFromPage } from '../utils/path.js'

const renderTemplateMiddleware = (req, res) => {
  const pageRendered = req.hidden_variables.pages[0]
  const template = getAssetPathFromPage(pageRendered.name, pageRendered.template.filename + '.html.twig')
  res.render(template, req.variables)
}

export default renderTemplateMiddleware
