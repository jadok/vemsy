import { expect } from 'chai'
import 'mocha'

import { arrayCompare } from '../../src/utils/array.js'
import { descOrder, testRoutes } from '../../src/utils/route-like-page.js'

describe('regex route', () => {

  it('descOrder negative', () => {
    const result = descOrder([ 'a', 'a', 'a' ], []);
    expect(result).to.equal(-3);
  });

  it('descOrder positive', () => {
    const result = descOrder([], [ 'a', 'a', 'a' ]);
    expect(result).to.equal(3);
  });

  it('descOrder equal', () => {
    const result = descOrder([ 'a', 'a', 'a' ], [ 'a', 'a', 'a' ]);
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
      const routes = testRoutes(test.routes, test.path)
      expect(routes.length).to.equal(test.expect.length)
      expect(arrayCompare(routes, test.expect)).to.equal(true)
    })
  })

})
