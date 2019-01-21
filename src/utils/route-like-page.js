export const descPageRouteOrder = (a, b) => b.route.length - a.route.length

/**
 * Get the list of defined path matching the route.
 *
 * @param {string[]} pages
 *   List of paths
 * @param {string} route
 *   actual route to test
 *
 * @return
 *   list of defined path matching the route
 */
export const testRoutes = (pages, route) => {
  const matchingRoutes = pages.reduce((acc, page) => {
    const reg = new RegExp(page.route)
    const t = reg.test(route)
    if (t) {
      acc.push(page)
    }
    return (acc)
  }, [])
  return matchingRoutes.sort(descPageRouteOrder)
}
