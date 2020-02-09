import { expect } from 'chai'
import 'mocha'
import { createGridVectorType, createPixelVectorType, convertVectorType } from './vector_type_transform'

describe('Create algebraic types', () => {
  it('create GridVector', () => {
    const gridVector = createGridVectorType({x: 1, y: 1})

    expect(gridVector).to.be.deep.equal({ kind: 'grid', value: {x: 1, y: 1}})
  })

  it('create PixelVector', () => {
    const pixelVector = createPixelVectorType({x: 1, y: 1})

    expect(pixelVector).to.be.deep.equal({ kind: 'pixel', value: {x: 1, y: 1}})
  })

  it('swap vector type', () => {
    const gridVector = createGridVectorType({ x: 2, y: 2 })
    const pixelVector = convertVectorType(gridVector)

    expect(pixelVector).to.be.deep.equal({ kind: 'pixel', value: {x: 2, y: 2}})
  })
})