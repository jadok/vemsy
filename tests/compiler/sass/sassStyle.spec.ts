import { expect } from 'chai'
import 'mocha'

import { SassStyle } from '../../../core/compiler/sass/sassStyle'

describe('Sass Style', () => {
  const sassStyle = new SassStyle()
  const testFiles: any[] = [
    {
      file: 'main.scss',
      expectMatch: true,
      expectResolver: '/css/main.css'
    },
    {
      file: 'main.css',
      expectMatch: false,
      expectResolver: '/css/main.css'
    },
    {
      file: 'main.scsss',
      expectMatch: false,
      expectResolver: '/css/main.css'
    },
    {
      file: '',
      expectMatch: false,
      expectResolver: '/css/.css'
    }
  ]
  testFiles.forEach((test) => {
    it('matchExtension - ' + test.file, () => {
      expect(sassStyle.matchExtension(test.file))
        .to.equal(test.expectMatch)
    })
    it('resolver - ' + test.file, () => {
      expect(sassStyle.resolver(test.file))
        .to.equal(test.expectResolver)
    })
  })

})