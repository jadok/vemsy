import asyncHandler from '../utils/async.js'

const markdownMiddleware = (req, res, next) => {
  if (typeof req.variables.data !== 'undefined' && __app.markdown) {
    const rendered = __app.markdown.render(req.variables.data.toString())
    req.variables.markdown = rendered
  }
  return next()
}

export default asyncHandler(markdownMiddleware)
