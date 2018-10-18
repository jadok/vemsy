import { expect } from 'chai'
import 'mocha'
import { join } from 'path'

import { StyleManager } from '../../core/style/manager'
import { SassStyle } from '../../core/style/sassStyle'

describe('style manager', () => {
  // set input variables.
  const themePath = join(__dirname, '..', 'fixtures')
  const publicPath = join(__dirname, '..', 'fixtures')

  const manager = new StyleManager(themePath, publicPath)

  it('should test constructor', () => {
    expect(manager.themePath).to.equal(themePath)
    expect(manager.publicPath).to.equal(publicPath)
  })

  it('should check the compiler(s) set', () => {
    manager.setCompilers()
    expect(manager.compilers.length).to.equal(1)
    expect(manager.compilers[0] instanceof SassStyle).to.equal(true)
  })

  it('should check compile', () => {
    const matchedCompilers = manager.compile('main.scss')
    expect(matchedCompilers.length).to.equal(1)
    expect(matchedCompilers[0] instanceof SassStyle).to.equal(true)
  })

  it('should resolve compiled file', () => {
    const filename = 'main.scss'
    const resolvedPath = manager.resolver(filename)
    expect(resolvedPath).to.equal((new SassStyle()).resolver(filename))
  })
})
