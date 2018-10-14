import { expect } from 'chai'
import 'mocha'
import * as httpMocks from 'node-mocks-http'

import { routingFileMiddleware } from '../../core/middlewares/routingFile'

describe('middlewares - routing markdown', () => {
  const viewPath = '/'
  it('should defined a markdown file', () => {
    const request  = httpMocks.createRequest({
      method: 'GET',
      url: '/DevEnv',
    });
    const response = httpMocks.createResponse()

    routingFileMiddleware(viewPath)(request, response, () => null)
    expect(typeof request.variables !== 'undefined').to.equal(true)
    expect(typeof request.variables.file !== 'undefined').to.equal(true)
  })
  it('should defined an asset file', () => {
    const filename = '/robot.txt'
    const request  = httpMocks.createRequest({
      method: 'GET',
      url: filename,
    });
    const response = httpMocks.createResponse()
    routingFileMiddleware(viewPath)(request, response, () => null)
    expect(typeof request.variables !== 'undefined').to.equal(true)
    expect(typeof request.variables.assetFile !== 'undefined').to.equal(true)
    expect(request.variables.assetFile).to.equal(filename)
  })
})
