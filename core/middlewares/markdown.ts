const markdown = require('markdown')
import { IRequestFileData } from './data'

export interface IRequestMarkdown extends IRequestFileData {
  variables: {
    file?: string
    data: string
    markdown?: string
  }
}

export const markdownMiddleware = (req: any, res: any, next: Function) => {
  if (typeof req.variables.data !== 'undefined') {
    const rendered = markdown.markdown.toHTML(req.variables.data.toString())
    req.variables.markdown = rendered
  }
  return next()
}
