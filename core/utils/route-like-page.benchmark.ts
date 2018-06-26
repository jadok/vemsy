import { testRoutes } from './route-like-page'

const Benchmark = require('benchmark')

const suite = new Benchmark.Suite

const paths = [
  '/',
  '/plop',
  '/name',
  '/author',
  '/authoriste',
  '/contnet',
  '/john/tra'
]

const routes = [
  '/plop/me',
  '/author/me'
]

routes.forEach((route) => {
  suite.add('route-like-page: ' + route, () => {
    testRoutes(paths, route)
  })
})
// add listeners
suite.on('cycle', function(event: any) {
  console.log(String(event.target));
})
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
suite.run({ 'async': true, 'queued': true })
