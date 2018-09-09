/**
 * Markdown view template
 */
import { Request, Response } from 'express'
import * as fs from 'fs'
import * as path from 'path'

const markdown = require('markdown')

export const defineContentReader = (
  viewPath: string
) => (req: any, res: Response, next: Function) => {
  // use the middleware if no file extension is provided
  if (req.originalUrl.indexOf('.') === -1) {
    // generate a windows readable path
    const filePath = (viewPath + req.originalUrl.toString() + '.md').split('/')
    fs.readFile(
      path.join('/', ...filePath),
      (err: NodeJS.ErrnoException, content: Buffer) => {
        if (err) {
          return next(new Error(err.toString()))
        }
        const rendered = markdown.markdown.toHTML(content.toString())
        if (typeof req.variables === 'undefined') {
          req.variables = {}
        }
        req.markdown = rendered
        return next();
      }
    )
  }
  else {
    return next();
  }
}

export default defineContentReader
