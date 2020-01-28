import { Vector, PixelVector, GridVector } from "../models/types"
import InputModel from "../models/InputModel"
import PlayerControllerModel from "../models/PlayerControllerModel"
import { findCellInPosition, findCenterPositionOfCell } from "../lib/utils"
import { createPixelVectorType, createGridVectorType } from "../lib/types_util"

const PLAYER_DEFAULT_MOVE_SPEED = 2

export default class Player implements PlayerControllerModel {
  private input: InputModel
  private collision: (gridPos: GridVector) => boolean
  private tilesize: number
  private element: Vector
  private speed: number

  constructor(
    input: InputModel,
    collision: (gridPos: GridVector) => boolean,
    renderPlayer: () => Vector,
    tilesize: number
  ) {
    this.input = input
    this.collision = collision
    this.tilesize = tilesize
    this.element = renderPlayer()
    this.setSpeed(PLAYER_DEFAULT_MOVE_SPEED)
  }

  public update() {
    this.move()
  }

  public getPixelPosition() {
    const { x, y } = this.element
    return createPixelVectorType({ x, y })
  }

  public getGridPosition() {
    const { tilesize } = this;
    const { x, y } = this.element

    const post = createPixelVectorType({ x, y })
    return findCellInPosition(tilesize, post)
  }

  public getSpeed() {
    return this.speed
  }

  public setSpeed(speed: number ) {
    return this.speed = speed
  }

  public moveToCell(col: number, row: number) {
    const gridPos = createGridVectorType({ x: col, y: row })
    const post = findCenterPositionOfCell(this.tilesize, gridPos)

    this.element.x = post.value.x
    this.element.y = post.value.y
  }

  private move() {
    const { element, tilesize: grid, collision } = this
    const vect = this.getMovementVector()
    if (vect.value.x === 0 && vect.value.y === 0) { return }

    const nextX = element.x + vect.value.x
    const nextY = element.y + vect.value.y

    const movementVector = createPixelVectorType({ x: nextX, y: nextY })
    const movementXVector = createPixelVectorType({ x: nextX, y: element.y })
    const movementYVector = createPixelVectorType({ x: element.x, y: nextY })

    const nextGridToCollide = findCellInPosition(grid, movementVector)
    const nextXGridToCollide = findCellInPosition(grid, movementXVector)
    const nextYGridToCollide = findCellInPosition(grid, movementYVector)

    if (collision(nextGridToCollide)) {
      element.x = nextX
      element.y = nextY
    } else if (collision(nextYGridToCollide)) {
      element.y = nextY
    } else if (collision(nextXGridToCollide)) {
      element.x = nextX
    }
  }

  private getMovementVector(): PixelVector {
    const { speed, input } = this
    const vect = { x: 0, y: 0 }

    if (input.isLeft()) {
        vect.x = -speed;
    } else if (input.isRight()) {
        vect.x = speed;
    }

    if (input.isUp()) {
        vect.y = -speed;
    } else if (input.isDown()) {
        vect.y = speed;
    }

    return createPixelVectorType(vect)
  }
}