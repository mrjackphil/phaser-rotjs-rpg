import { expect } from 'chai'
import 'mocha'
import { generateRNGLocation, getRandomNotSolidPosition } from '../entities/random'
import IGrid from '../types/IGrid'
import ICollision from '../types/ICollision'

describe('[Unstable]Generate random data', () => {
  it(`return a valid vector with zeros`, () => {
    const result = generateRNGLocation(0, 0)
    expect(result).to.deep.equal({ x: 0, y: 0 })
  })

  it(`return a non solid object`, () => {
    const grid: IGrid = {
      getCellCount: () => 0,
      getColCount: () => 5,
      getRowCount: () => 5,
      getTileSize: () => 0
    }

    const collision: ICollision = {
      isSolid: ({ value }) => !(value.x === 4 && value.y === 4),
      isEmpty: () => false
    }

    const result = getRandomNotSolidPosition(grid, collision)
    expect(result).to.deep.equal( { kind: 'grid', value: { x: 4, y: 4 } } )
  })

  it(`will generate zero vector`, () => {
    const grid: IGrid = {
      getCellCount: () => 0,
      getColCount: () => 0,
      getRowCount: () => 0,
      getTileSize: () => 0
    }

    const collision: ICollision = {
      isSolid: () => false,
      isEmpty: () => false
    }

    const result = getRandomNotSolidPosition(grid, collision)
    expect(result).to.deep.equal( { kind: 'grid', value: { x: 0, y: 0 } } )
  })

  it('will fail', () => {
    const grid: IGrid = {
      getCellCount: () => 0,
      getColCount: () => 5,
      getRowCount: () => 5,
      getTileSize: () => 0
    }

    const collision: ICollision = {
      isSolid: ({ value }) => !(value.x === 5 && value.y === 5),
      isEmpty: () => false
    }

    expect(() => getRandomNotSolidPosition(grid, collision)).to.throw()
  })
})