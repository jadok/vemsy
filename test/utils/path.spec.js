const { expect } = require('chai')
const path = require('path')
const fs = require('fs')
require('mocha')

const { filePathToPath, getAssetPathFromPage } = require('../../src/utils/path.js')

describe('filePathToPath', () => {
  const current_dir = process.cwd()
  const testSample = [
    {
      label: 'should match path',
      path: '/test/utils/path.spec.js',
      expect: path.join(current_dir, 'test', 'utils', 'path.spec.js')
    }
  ]
  testSample.forEach((test) => {
    it(test.label, () => {
      expect(filePathToPath(test.path)).to.equal(test.expect)
    })
  })
})

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
