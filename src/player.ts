import { InputSystem, RendererSystem, Updated, Vector, CollisionSystem, GridSystem, PixelVector } from "./types"
import { pixelToGridVector } from "./utils"
import { createPixelVectorType } from "./types_util"

const PLAYER_DEFAULT_MOVE_SPEED = 2

export default class Player implements Updated {
  speed: number;
  input: InputSystem
  element: Vector
  collision: CollisionSystem
  grid: GridSystem

  constructor(input: InputSystem, collision: CollisionSystem, renderer: RendererSystem, grid: GridSystem) {
    this.input = input
    this.speed = PLAYER_DEFAULT_MOVE_SPEED
    this.collision = collision
    this.grid = grid
    this.element = renderer.renderPlayer(0, 0)
  }

  public update() {
    this.move()
  }

  private move() {
    const { element, grid, collision } = this
    const vect = this.getMovementVector()

    const nextX = element.x + vect.value.x
    const nextY = element.y + vect.value.y
    const nextGridToCollide = pixelToGridVector(grid, createPixelVectorType({ x: nextX, y: nextY }))

    if (collision.isEmpty(nextGridToCollide)) {
      element.x+=vect.value.x
      element.y+=vect.value.y
    }
  }

  private getMovementVector(): PixelVector {
    const { speed, input } = this
    const vect = createPixelVectorType({ x: 0, y: 0})

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