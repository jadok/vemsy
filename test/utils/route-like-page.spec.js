import { expect } from 'chai'
import 'mocha'

import Page from '../../src/type/page.js'
import { arrayCompare } from '../../src/utils/array.js'
import { descPageRouteOrder, testRoutes } from '../../src/utils/route-like-page.js'

describe('regex route', () => {
  it('descPageRouteOrder negative', () => {
    const page1 = new Page('/route')
    const page2 = new Page('/route-long')
    const result = descPageRouteOrder(page1, page2);
    expect(result).to.equal(5);
  });

  it('descPageRouteOrder positive', () => {
    const page1 = new Page('/route-long')
    const page2 = new Page('/route')
    const result = descPageRouteOrder(page1, page2);
    expect(result).to.equal(-5);
  });

  it('descPageRouteOrder equal', () => {
    const page1 = new Page('/route-long')
    const page2 = new Page('/route-long')
    const result = descPageRouteOrder(page1, page2);
    expect(result).to.equal(0);
  });

  const routingTest = [
    {
      expect: [
        '/plop',
        '/'
      ],
      label: 'should find 2 routes',
      path: '/plop/me',
      routes: [
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
    }
  ]
  routingTest.forEach((test) => {
    it('Routes test - ' + test.label, () => {
      const pages = test.routes.map(route => new Page(route))
      const routes = testRoutes(pages, test.path)
      expect(routes.length).to.equal(test.expect.length)
      expect(arrayCompare(routes, test.expect)).to.equal(true)
    })
  })

})
