import { Task } from 'middleware-setup'
import morgan from 'morgan'
import * as winston from 'winston'

export default class extends Task {
  async execute() {
    const logger = winston.createLogger({
      transports: [
          new winston.transports.File(app.configs.logs.winston.file),
          new winston.transports.Console(app.configs.logs.winston.console)
      ],
      exitOnError: false
    })
    logger.stream = {
      write: message => logger.info(message)
    }
    app.server.use(morgan("combined", { "stream": logger.stream }))
  }
}
