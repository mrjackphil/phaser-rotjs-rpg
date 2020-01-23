import { hello } from './testExample'
import { expect } from 'chai'
import 'mocha'

describe('Check what test functionality works', () => {
  it('should return Hello', () => {
    const result = hello()
    expect(result).to.equal('Hello')
  })
})