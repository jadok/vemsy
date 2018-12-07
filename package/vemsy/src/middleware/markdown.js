const markdown = require('markdown')

const markdownMiddleware = (req, res, next) => {
  if (typeof req.variables.data !== 'undefined') {
    const rendered = markdown.markdown.toHTML(req.variables.data.toString())
    req.variables.markdown = rendered
  }
  return next()
}

module.exports = markdownMiddleware
