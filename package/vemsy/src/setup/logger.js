const { Task } = require('middleware-setup')
const morgan = require('morgan')
const winston = require('winston')

module.exports = class extends Task {
  async execute() {
    const logger = winston.createLogger({
      transports: [
          new winston.transports.File(app.configs.logs.winston.file),
          new winston.transports.Console(app.configs.logs.winston.file)
      ],
      exitOnError: false
    })
    logger.stream = {
      write: message => logger.info(message)
    }
    app.server.use(morgan("combined", { "stream": logger.stream }))
  }
}
