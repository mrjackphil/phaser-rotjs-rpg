import { expect } from 'chai'
import 'mocha'
import Player from './player'
import { InputSystem, CollisionSystem, RendererSystem, GridSystem } from './types'

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

  it('Moves up/left but left blocked', () => {
    const pl = new Player(
      { ...inputMock, isLeft: () => true, isUp: () => true },
      { ...collisionMock, isEmpty: ({value}) => value.x !== -1 },
      renderMock,
      gridMock
    )

    pl.speed = 2
    pl.update()

    expect(pl.element.x).to.be.eq(0)
    expect(pl.element.y).to.be.eq(-16)
  })

  it('Moves up/left but up blocked', () => {
    const pl = new Player(
      { ...inputMock, isRight: () => true, isUp: () => true },
      { ...collisionMock, isEmpty: ({value}) => value.y !== -1 },
      renderMock,
      gridMock
    )

    pl.element.x = 16
    pl.element.y = 16
    pl.speed = 2
    pl.update()

    expect(pl.element.x).to.be.eq(2)
    expect(pl.element.y).to.be.eq(0)
  })
})