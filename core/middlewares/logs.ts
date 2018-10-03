import { Request, Response } from 'express'
import * as morgan from 'morgan'
const winston = require('winston')

import filePathToPath from '../utils/path'

export interface ILogMiddleware {
  file: any;
}

/**
 * Trace request data.
 * implement morgan format
 *
 * @param tokens
 *   morgan methods to extract Request data.
 * @param req
 *   express Request
 * @param res
 *   express Respond
 */
export const traceFormat = (tokens: morgan.TokenIndexer, req: Request, res: Response) => [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')

/**
 * Request log middleware
 * implement Express middleware
 *
 * @param options
 *   middleware option
 */
export const logMiddleware = (options: ILogMiddleware) => {
  const configFile = options.file.winston.file
  configFile.filename = filePathToPath(configFile.filename)
  const logger = winston.createLogger({
    exitOnError: false, // do not exit on handled exceptions
    transports: [
      new winston.transports.File(configFile),
      new winston.transports.Console(options.file.winston.console)
    ],
  });
  logger.stream = {
    write: (message: string) => {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message);
    },
  };
  return morgan(traceFormat, { stream: logger.stream })
}
