import Template from './template.js'

import middlewareTypeCheck from './middleware.type.js'

const templateTypeCheck = (input) => {
  return input instanceof Template
    && input.plugins.reduce((acc, currPlugins) => acc && middlewareTypeCheck(currPlugins), true)
    && typeof input.filename === "string"
}

export default templateTypeCheck
