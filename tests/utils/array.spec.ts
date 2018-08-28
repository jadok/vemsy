import { expect } from 'chai'
import 'mocha'

import { arrayUnique } from '../../core/utils/array'

describe('Array Test', () => {

  it('only one result', () => {
    const result = arrayUnique([ 'a', 'a', 'a' ]);
    expect(result.length).to.equal(1);
  });

  it('not alter result', () => {
    const result = arrayUnique([]);
    expect(result.length).to.equal(0);
  });
})
