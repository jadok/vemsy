import { expect } from 'chai'
import 'mocha'
import { join } from 'path'

const fs = require('fs')

import sassCompile from '../../../core/compiler/sass/sass'

describe('Compile sass', () => {
  it('test compile sass', async function () {
    const input: string = join(__dirname, '..', '..', 'fixtures')
    const output: string = join(__dirname, '..', '..', 'fixtures', 'main.css')
    return sassCompile(
      'main.scss',
      input,
      output,
      (error: any, result: any) => {
        if (error) {
          console.log(error)
          expect(true).to.equal(false)
        }
        else {
          expect(JSON.parse(result.map).file)
            .to.equal('main.css')
        }
      })
  })
})