import setup from './setup/index.js'
import middleware from './middleware/index.js'
import { type } from './type/index.js'

import { runner, Task } from 'middleware-setup'

export default {
  middleware,
  runner,
  setup,
  type,
  Task
}
