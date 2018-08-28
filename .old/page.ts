import linkCSSGenerator, { Styles } from './link'

class Page {
  public title: string
  public path: RegExp
  public styles: Styles[] = []

  constructor(path: string = '') {
    this.path = new RegExp(`${path}`)
  }

  public matchRoute(path: string): boolean {
    console.log(this.path, path, this.path.test(path))
    return this.path.test(path)
  }
  public beforeRender(data: string): void {
    this.title = data.substr(0, data.indexOf('\n'))
  }

  public generateStyleLinks(): string {
    let links = ''
    this.styles.forEach((style: Styles) => {

      links += linkCSSGenerator(style)
    })
    console.log('generateStyleLinks', links)
    return links
  }
}

export default Page
