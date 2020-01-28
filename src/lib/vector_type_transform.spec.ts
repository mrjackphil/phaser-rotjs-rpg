import { expect } from 'chai'
import 'mocha'
import { createGridVectorType, createPixelVectorType, convertVectorType } from './vector_type_transform'

describe('Create algebraic types', () => {
  it('create GridVector', () => {
    const vect = createGridVectorType({x: 1, y: 1})

    expect(vect).to.be.deep.equal({ kind: 'grid', value: {x: 1, y: 1}})
  })

  it('create PixelVector', () => {
    const vect = createPixelVectorType({x: 1, y: 1})

    expect(vect).to.be.deep.equal({ kind: 'pixel', value: {x: 1, y: 1}})
  })

  it('swap vector type', () => {
    const grid = createGridVectorType({ x: 2, y: 2 })
    const vect = convertVectorType(grid)

    expect(vect).to.be.deep.equal({ kind: 'pixel', value: {x: 2, y: 2}})
  })
})