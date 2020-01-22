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

    const vect = { x: 0, y: 0 }

    if (input.isLeft()) {
        // this.element.x-=speed
        vect.x = -speed;
    } else if (input.isRight()) {
        // this.element.x+=speed
        vect.x = speed;
    }

    if (input.isUp()) {
        // this.element.y-=speed
        vect.y = -speed;
    } else if (input.isDown()) {
        // this.element.y+=speed
        vect.y = speed;
    }
    this.element.x+=vect.x
    this.element.y+=vect.y
  }
    }
  }
}