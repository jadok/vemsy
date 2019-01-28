import { testRoutes } from '../utils/route-like-page.js'

const routingTheme = (req, res, next) => {
  if (typeof req.hidden_variables !== 'undefined') {
    req.hidden_variables.pages = testRoutes(__app.theme.pages, req.path)
  }
  return next()
}

export default routingTheme
