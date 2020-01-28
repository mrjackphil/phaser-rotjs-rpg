import { expect } from 'chai'
import 'mocha'
import { generateRNGlocation, getRandomNotSolidPosition } from './random'
import { GridModel, CollisionModel } from './models/types'

describe('<Unstable>Generate random data', () => {
  it(`return a valid vector with zeros`, () => {
    const result = generateRNGlocation(0, 0)
    expect(result).to.deep.equal({ x: 0, y: 0 })
  })

  it(`return a non solid object`, () => {
    const grid: GridModel = {
      getCellCount: () => 0,
      getColCount: () => 5,
      getRowCount: () => 5,
      getTileSize: () => 0
    }

    const collision: CollisionModel = {
      isSolid: ({ value }) => !(value.x === 4 && value.y === 4),
      isEmpty: () => false
    }

    const result = getRandomNotSolidPosition(grid, collision)
    expect(result).to.deep.equal( { kind: 'grid', value: { x: 4, y: 4 } } )
  })

  it(`will generate zero vector`, () => {
    const grid: GridModel = {
      getCellCount: () => 0,
      getColCount: () => 0,
      getRowCount: () => 0,
      getTileSize: () => 0
    }

    const collision: CollisionModel = {
      isSolid: () => false,
      isEmpty: () => false
    }

    const result = getRandomNotSolidPosition(grid, collision)
    expect(result).to.deep.equal( { kind: 'grid', value: { x: 0, y: 0 } } )
  })

  it('will fail', () => {
    const grid: GridModel = {
      getCellCount: () => 0,
      getColCount: () => 5,
      getRowCount: () => 5,
      getTileSize: () => 0
    }

    const collision: CollisionModel = {
      isSolid: ({ value }) => !(value.x === 5 && value.y === 5),
      isEmpty: () => false
    }

    expect(() => getRandomNotSolidPosition(grid, collision)).to.throw()
  })
})