const getParamNames = require('../utils/func.js')

/**
 * Some people implements express middleware with differents form express middleware.
 * Some due to their code style don't write parameter name if the parameter is not used
 *  - like (, res)
 */
const PARAMS_VALIDATOR = {
  req: ['', 'req', 'request'],
  res: ['', 'res', 'response', undefined],
  next: ['next', undefined]
}

const middlewareTypeCheck = input => {
  const params = getParamNames(input)
  if (PARAMS_VALIDATOR.req.indexOf(params[0]) === -1) {
    return false
  }
  if (PARAMS_VALIDATOR.res.indexOf(params[1]) === -1) {
    return false
  }
  return (PARAMS_VALIDATOR.next.indexOf(params[2]) != -1)
}

module.exports = middlewareTypeCheck
