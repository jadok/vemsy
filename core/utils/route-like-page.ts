export const descOrder = (a: any, b: any) => b.length - a.length

/**
 * Get the list of defined path matching the route.
 *
 * @param paths
 *   List of paths
 * @param route
 *   actual route to test
 *
 * @return
 *   list of defined path matching the route
 */
export const testRoutes = (paths: string[], route: string): string[] => {
  const matchingRoutes = paths.reduce((acc: string[], path: string) => {
    const reg = new RegExp(path)
    const t = reg.test(route)
    if (t) {
      acc.push(path)
    }
    return (acc)
  }, [])
  return matchingRoutes.sort(descOrder)
}
