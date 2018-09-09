import { expect } from 'chai'
import 'mocha'
import { join } from 'path'

const fs = require('fs')

import sassCompile, { COMPILE_MODE } from '../../core/compiler/sass'

describe('Compile sass', () => {
  it('test compile sass', async function () {
    const input: string = join(__dirname, '..', 'fixtures', 'main.scss')
    const output: string = join(__dirname, '..', 'fixtures', 'main.css')
    return sassCompile(
      input,
      output,
      (error: any, result: any) => {
        if (error) {
          expect(true).to.equal(false)
        }
        else {
          expect(JSON.parse(result.map).file)
            .to.equal('main.css')
        }
      })
  })
})