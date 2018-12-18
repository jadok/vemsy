const { Task } = require('middleware-setup')

module.exports = class extends Task {
  constructor(middlewares) {
    super(middlewares)
    this.middlewares = middlewares
  }

  async execute() {
    if (typeof app.server === 'undefined') {
      throw new Error('Server not up.')
    }
    this.middlewares.forEach((middleware) => {
      t(middleware).isExpressMiddleware ?
        app.server.use(middleware)
        : app.server.use(middleware())
    }
    )
  }
}
