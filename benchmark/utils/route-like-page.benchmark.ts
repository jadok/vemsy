import { testRoutes } from '../../core/utils/route-like-page'

const paths = [
  '/',
  '/plop',
  '/name',
  '/author',
  '/authoriste',
  '/contnet',
  '/john/tra',
  '/voiture',
  '/singe/'
]

const routes = [
  '/plop/me',
  '/author/me'
]

export const test = (suite: any): void => routes.forEach((route) => {
  suite.add('route-like-page: ' + route, () => {
    testRoutes(paths, route)
  })
})
