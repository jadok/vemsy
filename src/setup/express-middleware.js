import { Task } from 'middleware-setup'

import { normalizeMiddlewares, plugMiddlewares } from '../utils/middleware.js'

export default class extends Task {
  constructor(middlewares) {
    super(middlewares)
    this.middlewares = middlewares
  }

  async execute() {
    if (typeof __app.server === 'undefined') {
      throw new Error('Server not up.')
    }
    const normalizedMiddlewares = normalizeMiddlewares(this.middlewares)
    return plugMiddlewares(__app.server, normalizedMiddlewares)
  }
}
