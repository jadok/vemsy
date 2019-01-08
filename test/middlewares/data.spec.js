import * as fs from 'fs'
import { expect } from 'chai'
import 'mocha'
import httpMocks from 'node-mocks-http'

import dataMiddleware from '../../src/middleware/data.js'
import filePathToPath from '../../src/utils/path.js'

describe('middlewares - data', () => {
  it('should find a file and read it', async () => {
    const request  = httpMocks.createRequest({
      method: 'GET',
      url: '/DevEnv',
    });
    const response = httpMocks.createResponse()

    request.variables = {
      file: './test/fixtures/readfile_test.txt'
    }
    return dataMiddleware(request, response, () => null)
      .then(() => {
        fs.readFile(
          filePathToPath(request.variables.file),
          (err, content) => {
            expect(typeof request.variables !== 'undefined').to.equal(true)
            expect(typeof request.variables.file !== 'undefined').to.equal(true)
            if (err) {
              expect(true).to.equal(false)
            }
            else {
              expect(content.toString()).to.equal(request.variables.data)
            }
          }
        )
     }
    )
  })

  it('should not find a file when reading it but set empty data', async () => {
    const request  = httpMocks.createRequest({
      method: 'GET',
      url: '/DevEnv',
    });
    const response = httpMocks.createResponse()

    request.variables = {
      file: './tests/fixtures/readfile_tes.txt'
    }
    return dataMiddleware(request, response, () => null)
      .then(() => {
        fs.readFile(
          filePathToPath(request.variables.file),
          () => {
            expect(typeof request.variables !== 'undefined').to.equal(true)
            expect(typeof request.variables.file !== 'undefined').to.equal(true)
            expect(request.variables.data).to.equal('')
          }
        )
     }
    )
  })
  it('should not have a file defined', async () => {
    const request  = httpMocks.createRequest({
      method: 'GET',
      url: '/DevEnv',
    });
    const response = httpMocks.createResponse()

    request.variables = {}
    return dataMiddleware(request, response, () => null)
      .then(() => {
        expect(typeof request.variables !== 'undefined').to.equal(true)
        expect(typeof request.variables.file === 'undefined').to.equal(true)
     }
    )
  })
})
