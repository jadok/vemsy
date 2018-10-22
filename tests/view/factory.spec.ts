import { expect } from 'chai'
import * as express from 'express'
import 'mocha'

import { factoryView } from '../../core/view/factory'
import Twig from '../../core/view/twig'

describe('factory - view engine', () => {
  it('should test the view engine (twig)', () => {
    const app = express()
    const viewPath = '/'
    const viewEngine = factoryView('twig', app, viewPath)
    if (viewEngine !== null) {
      expect(viewEngine.motor instanceof Twig).to.equal(true)
    }
    expect(app.get('views')).to.equal(viewPath)
    expect(app.get('view engine')).to.equal('twig')
  })

  it('should test the view engine (undefnied)', () => {
    const app = express()
    const viewPath = '/'
    const viewEngine = factoryView('other', app, viewPath)
    expect(viewEngine).to.equal(null)
    expect(app.get('views')).to.not.equal(viewPath)
    expect(app.get('view engine')).to.not.equal('other')
  })
})
