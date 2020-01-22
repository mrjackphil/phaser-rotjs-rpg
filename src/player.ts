const PLAYER_MOVE_SPEED = 2

export default class Player implements Updated {
  speed: number;
  input: InputSystem
  element: Movable
  constructor(input: InputSystem, scene: Phaser.Scene, renderer: Renderer) {
    this.input = input
    this.speed = PLAYER_MOVE_SPEED
    this.element = renderer.renderPlayer(0, 0)
  }

  public update() {
    this.movePlayer()
  }

  private movePlayer() {
    const { speed, input } = this

    if (input.isLeft()) {
        this.element.x-=speed
    } else if (input.isRight()) {
        this.element.x+=speed
    }

    if (input.isUp()) {
        this.element.y-=speed
    } else if (input.isDown()) {
        this.element.y+=speed
    }
  }
}