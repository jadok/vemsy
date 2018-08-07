import { expect } from 'chai'
import 'mocha'

import { mergeConfigurationWarn, IConfigOption } from '../core/config'

describe('mergeConfigurationWarn', () => {
  const optionSys: IConfigOption = {
    optional: false,
    system: true
  }
  const optionOpt: IConfigOption = {
    optional: true,
    system: false
  }
  const optionFull: IConfigOption = {
    optional: true,
    system: true
  }
  const optionFalse: IConfigOption = {
    optional: false,
    system: false
  }

  const testDebugs: any[] = [
    {
      test: 'system error',
      params: [ { app_path: [] }, 'app_path', optionSys],
      expect: -1
    },
    {
      test: 'it should warn',
      params: [ { app_path: [] }, 'app_path', optionOpt],
      expect: 1
    },
    {
      test: 'it should warn',
      params: [ { app_path: [] }, 'app_path', optionFull],
      expect: 1
    },
    {
      test: 'it should pass',
      params: [ { app_path: [] }, 'app_path', optionFalse],
      expect: 0
    },
  ]
  testDebugs.forEach((test) => {
    it(test.test, () => {
      expect(mergeConfigurationWarn(test.params[0], test.params[1], test.params[2], false))
        .to.equal(test.expect)
    })
  })
})