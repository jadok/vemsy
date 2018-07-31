import { expect } from 'chai'
import 'mocha'

import { descOrder, testRoutes } from '../../core/utils/route-like-page'

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
})
