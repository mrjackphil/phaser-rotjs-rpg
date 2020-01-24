import { expect } from 'chai'
import 'mocha'
import { generateRNGlocation, getRandomNotSolidPosition } from './random'
import { GridSystem, CollisionSystem } from './types'

describe('Generate random data', () => {
  it(`return a valid vector with zeros`, () => {
    const result = generateRNGlocation(0, 0)
    expect(result).to.deep.equal({ x: 0, y: 0 })
  })

  it(`return a valid vector with zeros`, () => {
    const grid: GridSystem = {
      getCellCount: () => 0,
      getColCount: () => 5,
      getRowCount: () => 5,
      getTileSize: () => 0
    }

    const collision: CollisionSystem = {
      isSolid: ({ value }) => !(value.x === 5 && value.y === 5)
    }

    const result = getRandomNotSolidPosition(grid, collision)
    expect(result).to.deep.equal( { kind: 'grid', value: { x: 5, y: 5 } } )
  })
})