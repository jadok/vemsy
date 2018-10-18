import { expect } from 'chai'
import 'mocha'
import { join } from 'path'

import { SassStyle } from '../../core/style/sassStyle'

describe('Sass Style', () => {
  const sassStyle = new SassStyle()
  const testFiles: any[] = [
    {
      expectMatch: true,
      expectResolver: join('/', 'css', 'main.css'),
      file: 'main.scss'
    },
    {
      expectMatch: false,
      expectResolver: join('/', 'css', 'main.css'),
      file: 'main.css'
    },
    {
      expectMatch: false,
      expectResolver: join('/', 'css', 'main.css'),
      file: 'main.scsss'
    },
    {
      expectMatch: false,
      expectResolver: join('/', 'css', '.css'),
      file: ''
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
