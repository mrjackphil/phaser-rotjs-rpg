import { expect } from 'chai'
import 'mocha'
import PlayerController from '../entities/PlayerController'
import IInput from '../types/IInput'
import { createGridVectorType } from '../lib/vector_type_transform'

const inputMock: IInput = {
  isDown: () => false,
  isLeft: () => false,
  isRight: () => false,
  isUp: () => false,
}
const collisionMock = () => true
const renderMock = () => ({ x: 0, y: 0 })

const gridMock: number = 16

describe('Player Controller', () => {
  it('Has update function', () => {
    const pl = new PlayerController(inputMock, collisionMock, renderMock, gridMock)

    expect(pl.update).to.be.a('function')
  })

  it('Spawns on 16, 16', () => {
    const pl = new PlayerController(
      { ...inputMock, isLeft: () => true },
      collisionMock,
      renderMock,
      gridMock
    )

    pl.moveToCell(1, 1)
    expect(pl.getPixelPosition().value).to.contain({ x: 16, y: 16 })
  })

  it('Moves left', () => {
    const pl = new PlayerController(
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
    const tileSize = 16
    const row = 5
    const col = 6

    const pl = new PlayerController(
      { ...inputMock, isLeft: () => true, isDown: () => true },
      (v) => v.value.x !== col - 1,
      renderMock,
      tileSize
    )

    const speed =  tileSize / 2

    pl.setSpeed(speed)
    pl.moveToCell(col, row)
    pl.update()
    pl.update()

    expect(pl.getPixelPosition().value).to.contain({ x: col *  tileSize - speed, y: row *  tileSize + (speed * 2) })
  })

  it('Press left/down but down is blocked and zero cells blocked', () => {
    const tileSize = 16

    const pl = new PlayerController(
      { ...inputMock, isLeft: () => true, isDown: () => true },
      (v) =>
           v.value.x !== 0
        && v.value.y !== 0
        && v.value.x !== 4
      ,
      renderMock,
      tileSize
    )

    pl.setSpeed(tileSize)
    pl.moveToCell(5, 5)
    pl.update()

    expect(pl.getPixelPosition().value).to.contain({ x: 5 * tileSize, y: 5 * tileSize + tileSize })
  })

  it('Get current grid position', () => {
    const tileSize = 4
    const pl = new PlayerController(
      { ...inputMock, isLeft: () => true, isDown: () => true },
      (v) =>
           v.value.x !== 0
        && v.value.y !== 0
        && v.value.x !== 4
      ,
      renderMock,
      tileSize
    )
    const gridPos = createGridVectorType({ x: 3, y: 4 })

    pl.moveToCell(3,4)

    expect(pl.getGridPosition()).to.be.deep.eq(gridPos)
  })
})