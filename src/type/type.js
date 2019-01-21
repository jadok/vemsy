import { addCustomTypes } from 'typy'

import middlewareTypeCheck from './middleware.type.js'
import pageTypeCheck from './page.type.js'
import templateTypeCheck from './template.type.js'

addCustomTypes({
  isExpressMiddleware: middlewareTypeCheck,
  isPage: pageTypeCheck,
  isTemplate: templateTypeCheck
})
