const Benchmark = require('benchmark')
import * as RouteLikePage from './utils/route-like-page.benchmark'

const suite = new Benchmark.Suite()

RouteLikePage.test(suite)
// add listeners
suite.on('cycle', (event: any) => {
  console.log(String(event.target));
})
suite.run({ async: true, queued: true })
