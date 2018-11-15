const chai = require('chai')
chai.should()

describe('API', () => {
  it('should load test setup', () => {
    const test = true
    test.should.eq(true)
  })
})
