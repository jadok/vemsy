import { expect } from 'chai'
import * as fs from 'fs'
import 'mocha'
import * as httpMocks from 'node-mocks-http'

import { dataMiddleware } from '../../core/middlewares/data'
import filePathToPath from '../../core/utils/path'

describe('middlewares - data', () => {
  it('should find a file and read it', async () => {
    const request  = httpMocks.createRequest({
      method: 'GET',
      url: '/DevEnv',
    });
    const response = httpMocks.createResponse()

    request.variables = {
      file: './tests/fixtures/readfile_test.txt'
    }
    return dataMiddleware(request, response, () => null)
      .then(() => {
        fs.readFile(
          filePathToPath(request.variables.file),
          (err: NodeJS.ErrnoException, content: Buffer) => {
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
          (err: NodeJS.ErrnoException, content: Buffer) => {
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
