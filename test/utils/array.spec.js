const { expect } = require('chai')
require('mocha')

require('../../src/utils/array.js')

describe('Array Test', () => {

  it('only one result', () => {
    const result = [ 'a', 'a', 'a' ].unique();
    expect(result.length).to.equal(1);
  });

  it('not alter result', () => {
    const result = [].unique();
    expect(result.length).to.equal(0);
  });

  it('compare equal arrays', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 3]
    expect(arr1.compare(arr2)).to.equal(true)
  })

  it('compare different size arrays', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 3, 4]
    expect(arr1.compare(arr2)).to.equal(false)
  })

  it('compare different arrays', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 4]
    expect(arr1.compare(arr2)).to.equal(false)
  })
})
