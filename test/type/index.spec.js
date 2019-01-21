import { assert } from 'chai'

import t from '../../src/type/index.js'
import getParamNames from '../../src/utils/func.js'

import Page from '../../src/type/page.js'
import pageTypeCheck from '../../src/type/page.type.js'

import Template from '../../src/type/template.js'
import templateTypeCheck from '../../src/type/template.type.js'

describe('Custom type checking', () => {
  const errorNotMiddleware = 'Should not match an express middleware pattern'
  const errorMiddleware = (nbr) => 'Should not fail at ' + nbr + ' params'
  const errorNotParameter = 'Should not find arguments'

  it('Middleware - standard function middleware', () => {
    assert(t(function sampleMiddlewareZ(req, res, next) { res.send(200) }).isExpressMiddleware === true, errorMiddleware(3))
    assert(t(function sampleMiddleware(req, res) { res.send(200) }).isExpressMiddleware === true, errorMiddleware(2))
    assert(t(function sampleMiddlewareZ(req) { req.send(200) }).isExpressMiddleware === true, errorMiddleware(1))

    assert(t(function sampleMiddleware(start) { start.send(200) }).isExpressMiddleware === false, errorNotMiddleware)
  })

  it('Middleware - anonymous function middleware', () => {
    const notExtraLongMiddleware = (cheese, wine, pastry, bread) => null
    assert(t(notExtraLongMiddleware).isExpressMiddleware === false, errorNotMiddleware)

    const completeMiddleware = (req, res, next) => null
    assert(t(completeMiddleware).isExpressMiddleware === true, errorMiddleware(3))
    const notLongMiddleware = (pizza, pasta, campari) => null
    assert(t(notLongMiddleware).isExpressMiddleware === false, errorNotMiddleware)

    const respondMiddleware = (req, res) => null
    assert(t(respondMiddleware).isExpressMiddleware === true, errorMiddleware(2))
    const notMediumMiddleware = (pizza, pasta) => null
    assert(t(notMediumMiddleware).isExpressMiddleware === false, errorNotMiddleware)
    const notMediumAlikeMiddleware = (request, flower) => null
    assert(t(notMediumAlikeMiddleware).isExpressMiddleware === false, errorNotMiddleware)

    const shortMiddleware = (req) => null
    assert(t(shortMiddleware).isExpressMiddleware === true, errorMiddleware(1))

    const notShortMiddleware = (burger) => null
    assert(t(notShortMiddleware).isExpressMiddleware === false, errorNotMiddleware)
  })

  // this function has been tested through src/type/index.js, but some edge cases are missing
  it('getParamNames edge cases', () => {
    assert(getParamNames('car').length === 0, errorNotParameter)
    assert(getParamNames({car:'mercedes'}).length === 0, errorNotParameter)
  })

  it('Template type', () => {
    const te = new Template()
    const tmp = new Template('root')
    assert(templateTypeCheck(te) === true)
    assert(templateTypeCheck({}) === false)
    assert(tmp.filename === 'root')
  })

  it('Page type', () => {
    const tmp = new Template('root')
    const page = new Page('/sample', tmp)
    assert(pageTypeCheck(page) === true)
    assert(pageTypeCheck({}) === false)
  })
})
