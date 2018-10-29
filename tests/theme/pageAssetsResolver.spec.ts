import { expect } from 'chai'
import 'mocha'

import { IPageDictionary } from '../../core/theme/IPageDictionary'
import { PageAssetsResolver } from '../../core/theme/pageAssetsResolver'
import TestPage from '../fixtures/TestPage'

describe('page resolver', () => {
  const page = new TestPage()
  const pages: IPageDictionary = {
    '/': page
  }
  const paths: string[] = [
    '/route',
    '/'
  ]
  const fakeResolver = (str: string) => 'name-' + str

  it('should test constructor', () => {
    const par = new PageAssetsResolver(
      pages,
      paths,
      fakeResolver
    )
    expect(par.pages).to.equal(par.pages)
    expect(par.paths).to.equal(par.paths)
  })

  it('should test updateCurrentTemplate', () => {
    const par = new PageAssetsResolver(
      pages,
      paths,
      fakeResolver
    )
    par.updateCurrentTemplate(page)
    expect(par.template).to.equal(page.template)
  })

  it('should test responseStyle', () => {
    const par = new PageAssetsResolver(
      pages,
      paths,
      fakeResolver
    )
    const response = par.responseStyle(page)
    expect(response.file).to.equal(fakeResolver(page.style.file))
    expect(response.media).to.equal(page.style.media)
    expect(response.priority).to.equal(page.style.priority)
  })
})
