import { expect } from 'chai'
import 'mocha'
import * as Util from './utils'
import { gridMock } from './mocks'

describe('Generate util functions', () => {
  it(`${Util.generateRNGlocation.name} return a valid vector with zeros`, () => {
    const result = Util.generateRNGlocation(0, 0)
    expect(result).to.deep.equal({ x: 0, y: 0 })
  })

  it('translate grid vector into pixel vector', () => {
    const vector = { x: 1, y: 1 }
    gridMock.getTileSize = () => 16

    const translated = Util.gridToPixelVector(gridMock, vector)
    expect(translated).to.be.deep.eq({ x: 16, y: 16 })
  })

  it('translate grid vector into pixel vector', () => {
    const vector = { x: 16, y: 16 }
    gridMock.getTileSize = () => 16

    const translated = Util.pixelToGridVector(gridMock, vector)
    expect(translated).to.be.deep.eq({ x: 1, y: 1 })
  })
})