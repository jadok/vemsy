const { expect } = require('chai')
const path = require('path')
const fs = require('fs')
require('mocha')

import routeInclude from '../../src/utils/route-include.js'

describe('route include', async () => {
  const pages = require('include-all')({
    dirname: path.join(__dirname, '..', 'fixtures'),
    excludeDirs: /^\.(git|svn)$/,
    filter: /(.+.page)\.js$/
  });
  const res = []

  it('should find nested pages', () => {
    routeInclude(pages, res)
    expect(res.length > 0).to.equal(true)
  })

  res.forEach((page) => {
    const pagePath = path.join(__dirname, '..', 'fixtures', page.name)
    console.log(page.name)
    it('should check if the page path exist for the path: ' + pagePath, () => {
      expect(fs.lstatSync(pagePath).isFile()).to.equal(true)
    })
  })
})
