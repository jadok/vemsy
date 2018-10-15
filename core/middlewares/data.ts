import { Request, Response } from 'express'
import * as fs from 'fs'
import * as util from 'util'

import filePathToPath from '../utils/path'
import { IRequestFile } from './routingFile'

const readFile = util.promisify(fs.readFile)

export interface IRequestFileData extends IRequestFile {
  variables: {
    file?: string;
    assetFile?: string;
    data: string
  }
}

export const dataMiddleware = async (req: any, res: Response, next: Function) => {
  if (!req.variables.file) {
    return next()
  }
  try {
    const filePath = req.variables.file
    const data = await readFile(filePathToPath(filePath), 'utf-8')
    req.variables.data = data
  }
  catch (e) {
    console.error(e, req.variables.file)
    req.variables.data = ''
  }
  return next()
}
