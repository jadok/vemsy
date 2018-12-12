const ARGUMENT_NAMES = /([^\s,]+)/g
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
const STANDARD_FUNC_DEFINITION = /.*\)[\s]+{/mg

const isAnonymousSingleParameter = fnStr => {
  const firstBracket = fnStr.indexOf('(') + 1
  const lastBracket =  fnStr.indexOf(')')
  const anonymousDefinition = fnStr.indexOf('=>')
  const standardDefinition = fnStr.match(STANDARD_FUNC_DEFINITION)
  if (anonymousDefinition === -1 && standardDefinition === null) {
    return ''
  }
  if (anonymousDefinition !== -1 && (anonymousDefinition < lastBracket || lastBracket < 0)) {
    return fnStr.slice(0, anonymousDefinition).trim()
  }
  return fnStr.slice(firstBracket, lastBracket)
}

const getParamNames = (func) => {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '')
  const result = isAnonymousSingleParameter(fnStr).match(ARGUMENT_NAMES)
  return result === null ? [] : result
}

module.exports = getParamNames
