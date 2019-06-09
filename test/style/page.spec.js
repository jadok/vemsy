import { expect } from 'chai'
import 'mocha'
import { normalize } from 'path'

import Page from '../../src/type/page.js'
import Style from '../../src/type/style.js'
import TwigTemplate from '../../src/type/twig-template.js'

import {
  compileStyleFiles,
  getStyleAssetsFromPages,
  getRealPathStylesFromActivePages
} from '../../src/style/page.js'

describe('style.page', () => {
  const template1 = new TwigTemplate('sample')
  const style1 = new Style('sample')
  const style2 = new Style('sample-next')
  const page1 = new Page('/sample', template1, [], style1, null, 'sample')
  const page1Sub = new Page('/sample/sub', template1, [], style2, null, 'sample.sub')
  const pageNoStyle = new Page('/', template1, [], null, null, 'root')

  const pages = [
    page1,
    page1Sub,
    pageNoStyle
  ]
  const fakeManager = {
    compile: async () => true,
    resolver: filename => normalize(`./${filename}.css`)
  }
  const tests = [
    {
      name: 'sample',
      params: [fakeManager, pages],
      expect: {
        nbrStyle: 2,
        resolver: [
          {
            file: normalize("./sample.css"),
            media: "all",
            priority: undefined
          },
          {
            file: normalize("./sample-next.css"),
            media: "all",
            priority: undefined,
          }
        ]
      }
    }
  ]
  tests.forEach((testCase) => {
    const styles = getStyleAssetsFromPages(testCase.params[1])
    it(`getStyleAssetsFromPages - ${testCase.name}`, () => {
      expect(styles.length).to.equal(testCase.expect.nbrStyle)
    })
    it(`compileStyleFiles - ${testCase.name}`, () => {
      compileStyleFiles(testCase.params[0], styles)
        .then(() => expect(true).to.equal(true))
        .catch(() => expect(true).to.equal(false))
    })
    it(`getRealPathStylesFromActivePages - ${testCase.name}`, () => {
      const cssFiles = getRealPathStylesFromActivePages(testCase.params[0], testCase.params[1])
      expect(JSON.stringify(cssFiles)).to.equal(JSON.stringify(testCase.expect.resolver))
    })
  })

})
