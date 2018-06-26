import { basename } from 'path'

const nconf = require('nconf')

class ConfigFiles {
  public namespace: string
  public systemFile: string
  public customFile: string

  constructor(systemFile: string, customFile: string) {
    this.namespace = basename(systemFile).replace(/\.[^/.]+$/, '')
    this.systemFile = systemFile
    this.customFile = customFile
    this.initNconf()
  }

  public get(key: string) {
    return nconf.get(key)
  }

  private initNconf() {
    nconf.defaults({ type: 'file', file: this.systemFile })
    nconf.add(this.namespace, { type: 'file', file: this.customFile })
  }

}

export default ConfigFiles
