import { expect } from 'chai'
import 'mocha'
import * as Util from './utils'
import { gridMock } from './mocks'
import { PixelVector, GridVector } from './types'

describe('Generate util functions', () => {
  it(`${Util.generateRNGlocation.name} return a valid vector with zeros`, () => {
    const result = Util.generateRNGlocation(0, 0)
    expect(result).to.deep.equal({ x: 0, y: 0 })
  })

  it('convert vector grid -> precise pixel', () => {
    const vector = { kind: 'grid', value: { x: 1, y: 1 } } as GridVector
    gridMock.getTileSize = () => 16

    const translated = Util.gridToPixelVector(gridMock, vector)
    expect(translated).to.be.deep.eq({ kind: 'pixel', value: { x: 16, y: 16 } })
  })

  it('convert vector precise pixel -> grid', () => {
    const vector = { kind: 'pixel', value: { x: 16, y: 16 } } as PixelVector
    gridMock.getTileSize = () => 16

    const translated = Util.pixelToGridVector(gridMock, vector)
    expect(translated).to.be.deep.eq({ kind: 'grid', value: { x: 1, y: 1 } } )
  })

  it('convert vector not precise pixel -> grid', () => {
    const vector = { kind: 'pixel', value: { x: 17, y: 17 } } as PixelVector
    gridMock.getTileSize = () => 16

    const translated = Util.pixelToGridVector(gridMock, vector)
    expect(translated).to.be.deep.eq({ kind: 'grid', value: { x: 1, y: 1 } } )
  })
})