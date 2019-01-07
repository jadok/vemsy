import { addCustomTypes, t } from 'typy'

import middlewareTypeCheck from './middleware.js'

addCustomTypes({
  isExpressMiddleware: middlewareTypeCheck
})

export default t
