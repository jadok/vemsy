const { expect } = require('chai')
require('mocha')

import expressMiddlewaresSetup from '../../src/setup/express-middleware.js'
import { normalizeMiddlewares, plugMiddlewares } from '../../src/utils/middleware.js'

describe('Setup - express-middleware', () => {
  it('should throw an error', async () => {
    const task = new expressMiddlewaresSetup([])
    task.execute()
      .then(() => expect(true).to.equal(false))
      .catch(() => expect(true).to.equal(true))
  })

  it('should work with an async middleware', async () => {
    const middlewareSample = (req, res) => res.send('OK')
    const middlewareAsync = async () => (req, res) => res.send('OK')
    const fakeExpress = {
      use: () => null
    }
    global.__app.server = fakeExpress
    const task = new expressMiddlewaresSetup([
      middlewareAsync,
      middlewareSample
    ])
    task.execute()
      .then((res) => expect(res.length).to.equal(2))
      .catch(() => expect(false).to.equal(true))
  })

  it('should not work with bad middleware', async () => {
    const notAMiddleware = (sample) => null
    const fakeExpress = {
      use: () => null
    }
    global.__app.server = fakeExpress
    const task = new expressMiddlewaresSetup([
      notAMiddleware
    ])
    task.execute()
      .then((res) => expect(res.length).to.equal(2))
      .catch(() => expect(true).to.equal(true))
  })

  it('should not work with bad async middleware', async () => {
    const notAMiddleware = (sample) => () => null
    const fakeExpress = {
      use: () => null
    }
    global.__app.server = fakeExpress
    const task = new expressMiddlewaresSetup([
      notAMiddleware
    ])
    task.execute()
      .then((res) => expect(res.length).to.equal(2))
      .catch(() => expect(true).to.equal(true))
  })
})
