import { expect } from 'chai'
import 'mocha'
import Player from './player'
import { InputSystem, CollisionSystem, RendererSystem, GridSystem } from './types'
import { createGridVectorType } from './types_util'

const inputMock: InputSystem = {
  isDown: () => false,
  isLeft: () => false,
  isRight: () => false,
  isUp: () => false,
}
const collisionMock: CollisionSystem = {
  isSolid: () => false,
  isEmpty: () => true
}
const renderMock: RendererSystem = {
  renderDoor: () => false,
  renderPlayer: () => ({x: 0, y: 0}),
  renderWall: () => false,
}
const gridMock: GridSystem = {
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
    expect(pl.element).to.contain({ x: 16, y: 16 })
  })

  it('Moves left', () => {
    const pl = new Player(
      { ...inputMock, isLeft: () => true },
      collisionMock,
      renderMock,
      gridMock
    )

    pl.speed = 1
    pl.update()

    expect(pl.element.x).to.be.eq(-1)
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
    pl.speed = speed
    pl.moveToCell(col, row)
    pl.update()
    pl.update()

    expect(pl.element).to.contain({ x: col * tilesize - speed, y: row * tilesize + (speed * 2) })
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

    pl.speed = 16
    pl.moveToCell(5, 5)
    pl.update()

    expect(pl.element).to.contain({ x: 5 * tilesize, y: 5 * tilesize + tilesize })
  })
})