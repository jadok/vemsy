/**
 * Transform the list of potential middlewares to a list of middlewares.
 *
 * @param {function[]} middlewares
 *   List of middleware functions or functions that return a middleware.
 *
 * @return {funciton[]}
 *   List of normalized middlewares.
 */
export const normalizeMiddlewares = (middlewares) => {
  return middlewares.map((middleware) => {
    return t(middleware).isExpressMiddleware ?
      middleware
      : middleware()
  })
}

/**
 * Attach the list of middlewares to the express entrypoint(Router or app).
 *
 * @param {function[]} middlewares
 *   List of probable middleware.
 *
 * @return {string[]}
 *   List of middlewares attached to the express entrypoint.
 */
export const plugMiddlewares = (expressEntrypoint, middlewares) => {
  return middlewares.reduce((middlewaresActivated, middleware) => {
    if (t(middleware).isExpressMiddleware) {
      expressEntrypoint.use(middleware)
      middlewaresActivated.push(middleware.name)
    }
    else {
      throw Error(`${middleware.name} is not a valid middleware`)
    }
    return middlewaresActivated
  }, [])
}
