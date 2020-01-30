import { Vector, PixelVector, GridVector } from "../types/types"
import InputModel from "../types/InputModel"
import PlayerControllerModel from "../types/PlayerControllerModel"
import { findCellInPosition, findCenterPositionOfCell } from "../lib/utils"
import { createPixelVectorType, createGridVectorType } from "../lib/vector_type_transform"

const PLAYER_DEFAULT_MOVE_SPEED = 2

export default class Player implements PlayerControllerModel {
  private input: InputModel
  private isEmpty: (gridPos: GridVector) => boolean
  private tileSize: number
  private element: Vector
  private speed: number

  constructor(
    input: InputModel,
    isEmptyFunc: (gridPos: GridVector) => boolean,
    renderPlayerFunc: () => Vector,
    tilesize: number
  ) {
    this.input = input
    this.isEmpty = isEmptyFunc
    this.tileSize = tilesize
    this.element = renderPlayerFunc()
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
    const { tileSize } = this;
    const { x, y } = this.element

    const post = createPixelVectorType({ x, y })
    return findCellInPosition(tileSize, post)
  }

  public getSpeed() {
    return this.speed
  }

  public setSpeed(speed: number ) {
    return this.speed = speed
  }

  public moveToCell(col: number, row: number) {
    const gridPos = createGridVectorType({ x: col, y: row })
    const post = findCenterPositionOfCell(this.tileSize, gridPos)

    this.element.x = post.value.x
    this.element.y = post.value.y
  }

  private move() {
    const { element, tileSize, isEmpty: collision } = this
    const vect = this.getMovementVector()
    if (vect.value.x === 0 && vect.value.y === 0) { return }

    const nextX = element.x + vect.value.x
    const nextY = element.y + vect.value.y

    const movementVector = createPixelVectorType({ x: nextX, y: nextY })
    const movementXVector = createPixelVectorType({ x: nextX, y: element.y })
    const movementYVector = createPixelVectorType({ x: element.x, y: nextY })

    const nextGridToCollide = findCellInPosition(tileSize, movementVector)
    const nextXGridToCollide = findCellInPosition(tileSize, movementXVector)
    const nextYGridToCollide = findCellInPosition(tileSize, movementYVector)

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