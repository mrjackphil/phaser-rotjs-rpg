import { Vector, PixelVector, GridVector } from "../types/types"
import IInput from "../types/IInput"
import IPlayerController from "../types/IPlayerController"
import { findCellInPosition, findCenterPositionOfCell } from "../lib/vector_grid_traslations"
import { createPixelVectorType, createGridVectorType } from "../lib/vector_type_transform"

const PLAYER_DEFAULT_MOVE_SPEED = 2

export default class PlayerController implements IPlayerController {
  private input: IInput
  private isEmpty: (gridPos: GridVector) => boolean
  private readonly tileSize: number
  private readonly element: Vector
  private speed: number

  constructor(
    input: IInput,
    isEmptyFunc: (gridPos: GridVector) => boolean,
    renderPlayerFunc: () => Vector,
    tileSize: number
  ) {
    this.input = input
    this.isEmpty = isEmptyFunc
    this.tileSize = tileSize
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
    const movementVector = this.getMovementVector()
    if (movementVector.value.x === 0 && movementVector.value.y === 0) { return }

    const nextX = element.x + movementVector.value.x
    const nextY = element.y + movementVector.value.y

    const movementPixelVector = createPixelVectorType({ x: nextX, y: nextY })
    const movementPixelXVector = createPixelVectorType({ x: nextX, y: element.y })
    const movementPixelYVector = createPixelVectorType({ x: element.x, y: nextY })

    const nextGridToCollide = findCellInPosition(tileSize, movementPixelVector)
    const nextXGridToCollide = findCellInPosition(tileSize, movementPixelXVector)
    const nextYGridToCollide = findCellInPosition(tileSize, movementPixelYVector)

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
    const movementVector = { x: 0, y: 0 }

    if (input.isLeft()) {
        movementVector.x = -speed;
    } else if (input.isRight()) {
        movementVector.x = speed;
    }

    if (input.isUp()) {
        movementVector.y = -speed;
    } else if (input.isDown()) {
        movementVector.y = speed;
    }

    return createPixelVectorType(movementVector)
  }
}