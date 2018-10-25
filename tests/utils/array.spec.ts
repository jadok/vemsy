import { expect } from 'chai'
import 'mocha'

import { arrayCompare, arrayUnique } from '../../core/utils/array'

describe('Array Test', () => {

  it('only one result', () => {
    const result = arrayUnique([ 'a', 'a', 'a' ]);
    expect(result.length).to.equal(1);
  });

  it('not alter result', () => {
    const result = arrayUnique([]);
    expect(result.length).to.equal(0);
  });

  it('compare equal arrays', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 3]
    expect(arrayCompare(arr1, arr2)).to.equal(true)
  })

  it('compare different size arrays', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 3, 4]
    expect(arrayCompare(arr1, arr2)).to.equal(false)
  })

  it('compare different arrays', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 4]
    expect(arrayCompare(arr1, arr2)).to.equal(false)
  })
})
