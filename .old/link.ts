export class Styles {
  public file: string
  public media?: string

  constructor(file: string) {
    this.file = file
  }
}

function linkCSSGenerator(style: Styles): string {
  this.link = style
  this.rel = 'stylesheet'
  // pathToRegexp(this.baseTemplate + ':path*' + this.extensionTemplate)
  const filename = style.file.replace(/^.*[\\\/]/, '')
  this.href = '/public/css/' + filename.substr(0, filename.indexOf('.scss')) + '.css'
  console.log(style.file)
  console.log(style.file.replace(/^.*[\\\/]/, ''))
  console.log(style.file.substr(0, style.file.replace(/^.*[\\\/]/, '').indexOf('.scss')))
  console.log(this.href)
  if (style.media) {
    this.media = style.media
  }

  let l = '<link href="' + this.href + '" '
  if (this.media) {
    l += 'media="' + this.media + '" '
  }
  l += 'rel="' + this.rel + '" '
  l += ' />'
  console.log('linkCSSGenerator', l)
  return l
}

export default linkCSSGenerator
