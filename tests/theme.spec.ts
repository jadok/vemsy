import { expect } from 'chai'
import 'mocha'

import { checkSubVars, themeAttributes } from '../core/theme'

class CarPage { }

describe('themeAttributes', ()  =>{
  const testsThemeAttributes: any[] = [
    {
      name: 'Test common case',
      params: ['car', 'Page', { car: { CarPage } }],
      expect: ['CarPage', false]
    },
    {
      name: 'Test file in camel case',
      params: ['GoodDay', 'Page', { GoodDay: { CarPage } }],
      expect: ['GoodDayPage', true]
    },
    {
      name: 'Test sub variables',
      params: ['GoodDay', 'Page', { GoodDay: { sample: { CarPage } } }],
      expect: ['GoodDayPage', true]
    }
  ]
  testsThemeAttributes.forEach(element => {
    it(element.name, () => {
      const theme: string = themeAttributes(element.params[0], element.params[1])
      expect(theme)
        .to.equal(element.expect[0])
      expect(checkSubVars(element.params[2], element.params[0], theme))
        .to.equal(element.expect[1])
    })
  });
})
