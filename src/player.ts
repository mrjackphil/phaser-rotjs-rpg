import { InputSystem, Renderer, Updated, Vector, State, CollisionSystem } from "./types"

const PLAYER_DEFAULT_MOVE_SPEED = 2

export default class Player implements Updated {
  speed: number;
  input: InputSystem
  element: Vector
  collision: CollisionSystem
  state: State

  constructor(input: InputSystem, collision: CollisionSystem, renderer: Renderer, state: State) {
    this.input = input
    this.speed = PLAYER_DEFAULT_MOVE_SPEED
    this.collision = collision
    this.state = state
    this.element = renderer.renderPlayer(0, 0)
  }

  public update() {
    this.move()
  }

  private move() {
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

    if (!this.collision.isSolid(this.getCurrentGridPosition(this.element.x + vect.x, this.element.y + vect.y))) {
      this.element.x+=vect.x
      this.element.y+=vect.y
    }
  }

  private getCurrentGridPosition(_x?: number, _y?: number) {
    const x = _x || this.element.x
    const y = _y || this.element.y

    return {
      x: Math.round(x / this.state.gridSize),
      y: Math.round(y / this.state.gridSize)
    }
  }
}