/**
 * Markdown view template
 */
import { Request } from 'express'
import * as fs from 'fs'
import * as path from 'path'

const markdown = require('markdown')

interface IMarkdownExpressRequest extends Request {
  markdown: string
}

export const defineContentReader = (
  viewPath: string
) => (req: IMarkdownExpressRequest, res: Express.Response, next: Function) => {
  if (req.originalUrl.indexOf('.') === -1) {
    fs.readFile(
      path.join(viewPath, req.originalUrl.toString() + '.md'),
      (err: NodeJS.ErrnoException, content: Buffer) => {
        if (err) {
          return next(new Error(err.toString()))
        }
        // this is an extremely simple template engine
        const rendered = markdown.markdown.toHTML(content.toString())
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
