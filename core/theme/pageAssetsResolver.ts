import { BasePage } from '../page'
import { IPageDictionary } from './IPageDictionary'

export class PageAssetsResolver {
  public pages: IPageDictionary
  public paths: string[]
  public styleResolver: (x: any) => string
  public globalStyle: any = null
  public template: any = null
  public styles: any[] = []

  constructor(pages: IPageDictionary, paths: string[], styleResolver: (x: any) => string) {
    this.pages = pages
    this.paths = paths
    this.styleResolver = styleResolver
  }

  public updateCurrentTemplate(page: BasePage) {
    if (page.template !== null) {
      this.template = page.template
    }
  }
  public responseStyle(page: BasePage) {
    return {
      ...page.style,
      file: this.styleResolver(page.style.file)
    }
  }

  public resolve() {
    this.paths.forEach((myPath: string) => {
      this.updateCurrentTemplate(this.pages[myPath])
      if (!this.globalStyle && this.pages[myPath].generalStyle) {
        this.globalStyle = this.styleResolver(this.pages[myPath].generalStyle)
        this.styles.slice(0, this.styles.length)

        this.styles.push(this.responseStyle(this.pages[myPath]))
      }
      else {
        this.styles.push(this.responseStyle(this.pages[myPath]))
      }
    })
    return {
      globalStyle: this.globalStyle,
      styles: this.styles,
      template: this.template
    }
  }
}
