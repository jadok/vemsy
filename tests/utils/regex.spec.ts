import { expect } from 'chai'
import 'mocha'

import { matchPath } from '../../core/utils/regex'

describe('regex Test', () => {

  it('should yell true', () => {
    const result = matchPath('');
    expect(result).to.equal(true);
  });

})
