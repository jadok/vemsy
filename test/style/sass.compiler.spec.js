import { expect } from 'chai'
import 'mocha'
import { join } from 'path'

import SassManager from '../../src/style/sass/manager.js'

describe('Sass Style', () => {
  const sassStyle = new SassManager()
  const testFiles = [
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
      expect(sassStyle.isMatchedExtension(test.file))
        .to.equal(test.expectMatch)
    })
    it('resolver - ' + test.file, () => {
      expect(sassStyle.resolver(test.file))
        .to.equal(test.expectResolver)
    })
  })

  const testsOutput = [
    {
      fileDirs: ['feature', 'index.scss'],
      publicPath: 'home/username/public',
      expect: {
        fullFileName: 'index.scss',
        dist: join('home', 'username', 'public', 'css', 'feature', 'index.css')
      }
    }
  ]

  testsOutput.forEach((test) => {
    it('destinationCompiledFile - ' + test.fileDirs.toString(), () => {
      const res = sassStyle.destinationCompiledFile(test.fileDirs, test.publicPath)
      expect(res.fullFileName)
        .to.equal(test.expect.fullFileName)
      expect(res.dist)
        .to.equal(test.expect.dist)
    })
  })

})
