import Template from './template.js'

import middlewareTypeCheck from './middleware.type.js'
import templateTypeCheck from './template.type.js'

const pageTypeCheck = (input) => {
  return input.template instanceof Template && templateTypeCheck(input.template)
    && input.plugins.reduce((acc, currPlugins) => acc && middlewareTypeCheck(currPlugins), true)
    && typeof input.route === "string"
}

export default pageTypeCheck
