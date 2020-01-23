import { expect } from 'chai'
import 'mocha'

describe('Check what test functionality works', () => {
  it('should return Hello', () => {
    const result = 'Hello'
    expect(result).to.equal('Hello')
  })
})