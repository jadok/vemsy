import { addCustomTypes } from 'typy'

import pageTypeCheck from './page.type.js'
import styleTypeCheck from './style.type.js'
import templateTypeCheck from './template.type.js'
import middlewareTypeCheck from './middleware.type.js'

addCustomTypes({
  isPage: pageTypeCheck,
  isStyle: styleTypeCheck,
  isTemplate: templateTypeCheck,
  isExpressMiddleware: middlewareTypeCheck,
})
