const descOrder = (a, b) => b.length - a.length

/**
 * Get the list of defined path matching the route.
 *
 * @param {string[]} paths
 *   List of paths
 * @param {string} route
 *   actual route to test
 *
 * @return
 *   list of defined path matching the route
 */
const testRoutes = (paths, route) => {
  const matchingRoutes = paths.reduce((acc, path) => {
    const reg = new RegExp(path)
    const t = reg.test(route)
    if (t) {
      acc.push(path)
    }
    return (acc)
  }, [])
  return matchingRoutes.sort(descOrder)
}

export default {
  descOrder,
  testRoutes
}
