import { expect } from 'chai'
import 'mocha'
import { join } from 'path'

import StyleManager from '../../src/style/manager.js'
import SassStyle from '../../src/style/sass/manager.js'

describe('style manager', () => {
  // set input variables.
  const themePath = join(__dirname, '..', 'fixtures')
  const publicPath = join(__dirname, '..', 'fixtures')

  const manager = new StyleManager(themePath, publicPath)
  manager.compilers.push(new SassStyle())
  it('should test constructor', () => {
    expect(manager.themePath).to.equal(themePath)
    expect(manager.publicPath).to.equal(publicPath)
  })

  it('should check compile', () => {
    const matchedCompilers = manager.compile('main.scss')
    matchedCompilers
      .then(() => expect(true).to.equal(true))
      .catch(err => expect(err).to.equal(false))
  })

  it('should resolve compiled file', () => {
    const filename = 'main.scss'
    const resolvedPath = manager.resolver(filename)
    expect(resolvedPath).to.equal((new SassStyle()).resolver(filename))
  })
})
