import { expect } from 'chai'
import 'mocha'
import GridManager from './grid'
import { Grid } from './types'

describe('Grid tests', () => {
  it('get column count', () => {
    const grid: Grid = new GridManager(10, 10)

    expect(grid.getColCount()).to.be.a('number')
  })
})