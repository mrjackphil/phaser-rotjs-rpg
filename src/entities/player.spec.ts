import { expect } from 'chai'
import 'mocha'
import Player from './player'
import { InputModel, CollisionModel, RendererModel, GridModel } from '../models/types'

const inputMock: InputModel = {
  isDown: () => false,
  isLeft: () => false,
  isRight: () => false,
  isUp: () => false,
}
const collisionMock: CollisionModel = {
  isSolid: () => false,
  isEmpty: () => true
}
const renderMock: RendererModel = {
  renderDoor: () => false,
  renderPlayer: () => ({x: 0, y: 0}),
  renderWall: () => false,
}
const gridMock: GridModel = {
  getCellCount: () => 0,
  getTileSize: () => 16,
  getRowCount: () => 5,
  getColCount: () => 5
}

describe('Player Controller', () => {
  it('Has update function', () => {
    const pl = new Player(inputMock, collisionMock, renderMock, gridMock)

    expect(pl.update).to.be.a('function')
  })

  it('Spawns on 16, 16', () => {
    const pl = new Player(
      { ...inputMock, isLeft: () => true },
      collisionMock,
      renderMock,
      gridMock
    )

    pl.moveToCell(1, 1)
    expect(pl.getPixelPosition().value).to.contain({ x: 16, y: 16 })
  })

  it('Moves left', () => {
    const pl = new Player(
      { ...inputMock, isLeft: () => true },
      collisionMock,
      renderMock,
      gridMock
    )

    pl.setSpeed(1)
    pl.update()

    expect(pl.getPixelPosition().value.x).to.be.eq(-1)
  })

  it('Press left/down but down is blocked', () => {
    const tilesize = 16
    const row = 5
    const col = 6

    const pl = new Player(
      { ...inputMock, isLeft: () => true, isDown: () => true },
      { ...collisionMock, isEmpty: (v) => v.value.x !== col - 1 },
      renderMock,
      { ...gridMock, getTileSize: () => tilesize }
    )

    const half = tilesize / 2
    const speed = half

    pl.setSpeed(speed)
    pl.moveToCell(col, row)
    pl.update()
    pl.update()

    expect(pl.getPixelPosition().value).to.contain({ x: col * tilesize - speed, y: row * tilesize + (speed * 2) })
  })

  it('Press left/down but down is blocked and zero cells blocked', () => {
    const tilesize = 16

    const pl = new Player(
      { ...inputMock, isLeft: () => true, isDown: () => true },
      { ...collisionMock, isEmpty: (v) =>
           v.value.x !== 0
        && v.value.y !== 0
        && v.value.x !== 4
      },
      renderMock,
      gridMock
    )

    pl.setSpeed(tilesize)
    pl.moveToCell(5, 5)
    pl.update()

    expect(pl.getPixelPosition().value).to.contain({ x: 5 * tilesize, y: 5 * tilesize + tilesize })
  })
})