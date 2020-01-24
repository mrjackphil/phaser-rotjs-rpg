import { expect } from 'chai'
import 'mocha'
import { generateRNGlocation } from './random'

describe('Test function which generate random data', () => {
  it(`${generateRNGlocation.name} return a valid vector with zeros`, () => {
    const result = generateRNGlocation(0, 0)
    expect(result).to.deep.equal({ x: 0, y: 0 })
  })
})