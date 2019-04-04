const { expect } = require('chai')
require('mocha')

require('../../src/utils/object.js')

describe('Object Test', () => {

  it('clone', () => {
    const obj = {
      a: 87,
      u: [{ o: 'sample'}]
    }
    const clone = obj.cloneCustom()
    expect(JSON.stringify(clone)).to.equal(JSON.stringify(obj))
    expect(obj.a).to.equal(clone.a)
    expect(obj.u[0]).to.equal(clone.u[0])
    clone.a = 86
    expect(obj.a).not.to.equal(clone.a)
  })
})
