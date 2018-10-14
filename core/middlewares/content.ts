import { Request, Response } from 'express'
import * as fs from 'fs'
import * as util from 'util'

import filePathToPath from '../utils/path'

const readFile = util.promisify(fs.readFile)

export interface IRequestFile extends Request {
  variables: {
    file?: string
  }
}

export interface IRequestFileData extends IRequestFile {
  variables: {
    file?: string
    data: string
  }
}

export const pathFinderMiddleware = (
  viewPath: string
) => (req: IRequestFile, res: Response, next: Function) => {
  if (typeof req.variables === 'undefined') {
    req.variables = {}
  }
  // use the middleware if no file extension is provided
  if (req.originalUrl.indexOf('.') === -1) {
    // generate a windows readable path
    req.variables.file = viewPath + req.originalUrl.toString() + '.md'
  }
  next()
}

export const dataMiddleware = async (req: IRequestFileData, res: Response, next: Function) => {
  const filePath = req.variables.file
  const data = await readFile(filePathToPath(filePath), 'utf-8')
  req.variables.data = data
  return next()
}

export default pathFinderMiddleware
