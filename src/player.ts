import { InputSystem, RendererSystem, Updated, Vector, CollisionSystem, GridSystem } from "./types"
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
    const { speed, input } = this
    const vec = createPixelVectorType({ x: 0, y: 0 })
    const vect = vec.value

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

    const nextX = this.element.x + vect.x
    const nextY = this.element.y + vect.y
    const nextGridToCollide = pixelToGridVector(this.grid, createPixelVectorType({ x: nextX, y: nextY }))

    if (!this.collision.isSolid(nextGridToCollide)) {
      this.element.x+=vect.x
      this.element.y+=vect.y
    }
  }
}