import { expect } from 'chai'
import 'mocha'
import * as httpMocks from 'node-mocks-http'

const markdownMiddleware = require('../../src/middleware/markdown.js')

describe('middlewares - markdown', () => {
  it('should transform markdown data (empty)', async () => {
    const request  = httpMocks.createRequest({
      method: 'GET',
      url: '/DevEnv',
    });
    const response = httpMocks.createResponse()

    request.variables = {
      data: ''
    }
    markdownMiddleware(request, response, () => null)
    expect(typeof request.variables !== 'undefined').to.equal(true)
    expect(typeof request.variables.data !== 'undefined').to.equal(true)
    expect(request.variables.data).to.equal(request.variables.markdown)

  })

  it('should transform markdown data', async () => {
    const request  = httpMocks.createRequest({
      method: 'GET',
      url: '/DevEnv',
    });
    const response = httpMocks.createResponse()

    request.variables = {
      data: 'Hello *World*!'
    }
    markdownMiddleware(request, response, () => null)
    expect(typeof request.variables !== 'undefined').to.equal(true)
    expect(typeof request.variables.data !== 'undefined').to.equal(true)
    expect(request.variables.markdown).to.equal('<p>Hello <em>World</em>!</p>')
  })

  it('should do nothing', async () => {
    const request  = httpMocks.createRequest({
      method: 'GET',
      url: '/DevEnv',
    });
    const response = httpMocks.createResponse()

    request.variables = {}
    markdownMiddleware(request, response, () => null)
    expect(typeof request.variables !== 'undefined').to.equal(true)
    expect(typeof request.variables.data === 'undefined').to.equal(true)
    expect(typeof request.variables.markdown === 'undefined').to.equal(true)
  })

})
