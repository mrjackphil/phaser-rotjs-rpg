import { expect } from 'chai'
import 'mocha'
import { createGridVector, createPixelVector, convertVectorType } from './types_util'

describe('Create algebraic types', () => {
  it('create GridVector', () => {
    const vect = createGridVector({x: 1, y: 1})

    expect(vect).to.be.deep.equal({ kind: 'grid', value: {x: 1, y: 1}})
  })

  it('create PixelVector', () => {
    const vect = createPixelVector({x: 1, y: 1})

    expect(vect).to.be.deep.equal({ kind: 'pixel', value: {x: 1, y: 1}})
  })

  it('swap vector type', () => {
    const grid = createGridVector({ x: 2, y: 2 })
    const vect = convertVectorType(grid)

    expect(vect).to.be.deep.equal({ kind: 'pixel', value: {x: 2, y: 2}})
  })
})