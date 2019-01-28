const renderTemplateMiddleware = (req, res) => {
  const template = req.hidden_variables.pages[0]
    .template.filename + '.html.twig'
  res.render(template, req.variables)
}

export default renderTemplateMiddleware
