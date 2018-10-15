const markdown = require('markdown')

export const markdownMiddleware = (req: any, res: any, next: Function) => {
  if (typeof req.variables.data !== 'undefined') {
    const rendered = markdown.markdown.toHTML(req.variables.data.toString())
    req.variables.markdown = rendered
  }
  return next()
}
