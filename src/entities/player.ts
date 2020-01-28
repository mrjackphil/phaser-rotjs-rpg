import { Vector, PixelVector } from "../models/types"
import RendererModel from "../models/RendererModel"
import InputModel from "../models/InputModel"
import GridModel from "../models/GridModel"
import CollisionModel from "../models/CollisionModel"
import PlayerControllerModel from "../models/PlayerControllerModel"
import { findCellInPosition, findCenterPositionOfCell } from "../lib/utils"
import { createPixelVectorType, createGridVectorType } from "../lib/types_util"

const PLAYER_DEFAULT_MOVE_SPEED = 2

export default class Player implements PlayerControllerModel {
  private input: InputModel
  private collision: CollisionModel
  private grid: GridModel
  private element: Vector
  private speed: number

  constructor(input: InputModel, collision: CollisionModel, renderer: RendererModel, grid: GridModel) {
    this.input = input
    this.collision = collision
    this.grid = grid
    this.element = renderer.renderPlayer(0, 0)
    this.setSpeed(PLAYER_DEFAULT_MOVE_SPEED)
  }

  public update() {
    this.move()
  }

  public getPixelPosition() {
    return createPixelVectorType({ x: this.element.x, y: this.element.y })
  }

  public getGridPosition() {
    return createGridVectorType({ x: this.element.x, y: this.element.y })
  }

  public getSpeed() {
    return this.speed
  }

  public setSpeed(speed: number ) {
    return this.speed = speed
  }

  public moveToCell(col: number, row: number) {
    const gridPos = createGridVectorType({ x: col, y: row })
    const post = findCenterPositionOfCell(this.grid, gridPos)

    this.element.x = post.value.x
    this.element.y = post.value.y
  }

  private move() {
    const { element, grid, collision } = this
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

    if (collision.isEmpty(nextGridToCollide)) {
      element.x = nextX
      element.y = nextY
    } else if (collision.isEmpty(nextYGridToCollide)) {
      element.y = nextY
    } else if (collision.isEmpty(nextXGridToCollide)) {
      element.x = nextX
    }
  }

  private getMovementVector(): PixelVector {
    const { speed, input } = this
    const vect = createPixelVectorType({ x: 0, y: 0 })

    if (input.isLeft()) {
        vect.value.x = -speed;
    } else if (input.isRight()) {
        vect.value.x = speed;
    }

    if (input.isUp()) {
        vect.value.y = -speed;
    } else if (input.isDown()) {
        vect.value.y = speed;
    }

    return vect
  }
}