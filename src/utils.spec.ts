import { expect } from 'chai'
import 'mocha'
import { generateRNGlocation } from './utils'
import { Vector } from './types'

describe('Generate util functions', () => {
  it(`${generateRNGlocation.name} return a valid vector with zeros`, () => {
    const result: Vector = generateRNGlocation(0, 0)
    expect(result).to.deep.equal({ x: 0, y: 0 })
  })
})