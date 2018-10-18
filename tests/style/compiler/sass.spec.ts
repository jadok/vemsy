import { expect } from 'chai'
import 'mocha'
import 'mocha-sinon'
import { join } from 'path'
import * as sinon from 'sinon'

const fs = require('fs')

import sassCompile, { sassResult, writeFileResult } from '../../../core/style/compiler/sass'

describe('Compile sass', () => {
  it('should compile sass', async () => {
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

  it('should error when mocking sass compiling', () => {
    const mockError = {
      column: 55,
      line: 1,
      message: 'an error has occured',
      status: 404
    }
    const consoleErr = sinon.spy(console, 'error')
    sassResult(
      join(__dirname, '..', '..', 'fixtures', 'main.css')
    )(mockError, null)
    expect(consoleErr.callCount).to.equal(4)
    consoleErr.restore()
  })

  it('should mock like a fail attempt to write css file', () => {
    const consoleErrs = sinon.spy(console, 'error')

    const result = writeFileResult(
      join(__dirname, '..', '..', 'wrong-folder', 'main.css'),
      null
    )('an error has occured')
    expect(consoleErrs.callCount).to.equal(1)
    expect(result).to.equal(1)
    consoleErrs.restore()
  })

  it('should mock like a css file was written', () => {
    const consoleLogs = sinon.spy(console, 'log')

    const result = writeFileResult(
      join(__dirname, '..', '..', 'wrong-folder', 'main.css'),
      { stats: { duration: 0 }}
    )(null)
    expect(consoleLogs.callCount).to.equal(1)
    expect(result).to.equal(0)
    consoleLogs.restore()
  })
})
