import { expect } from 'chai'
import 'mocha'
import GridManager from '../entities/GridManager'
import IGrid from '../types/IGrid'

describe('Grid tests', () => {
  it('get column count', () => {
    const grid: IGrid = new GridManager(14, 10)

    expect(grid.getColCount()).to.be.eq(14)
  })

  it('get row count', () => {
    const grid: IGrid = new GridManager(13, 11)

    expect(grid.getRowCount()).to.be.eq(11)
  })

  it('get tileSize default value', () => {
    const grid: IGrid = new GridManager(13, 11)

    expect(grid.getTileSize()).to.be.eq(16)
  })

  it('get tileSize changed value', () => {
    const grid: IGrid = new GridManager(13, 11, 27)

    expect(grid.getTileSize()).to.be.eq(27)
  })

  it('get grid cells count', () => {
    const grid: IGrid = new GridManager(5, 5)

    expect(grid.getCellCount()).to.be.eq(25)
  })
})