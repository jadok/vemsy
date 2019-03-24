const { expect } = require('chai')
const path = require('path')
require('mocha')

const { getAssetPathFromPage } = require('../../src/utils/path.js')

describe('getAssetPathFromPage', () => {

  const testSample = [
    {
      label: 'asset with relative path',
      test: {
        file: 'sample',
        current: '/plop/plop.page'
      },
      expect: path.join('plop', 'sample'),
    },
    {
      label: 'asset with absolute path',
      test: {
        file: '/sample',
        current: '/plop/plop.page'
      },
      expect: path.join('sample'),
    }
  ]

  testSample.forEach((test) => {
    it(test.label, () => {
      expect(getAssetPathFromPage(test.test.current, test.test.file)).to.equal(test.expect)
    })
  })
})
