import { Renderer, State } from "./types"

export default class RendererText implements Renderer {
  scene: Phaser.Scene
  state: State

  constructor(scene: Phaser.Scene, state: State) {
    this.scene = scene
    this.state = state
  }

  public renderWall(x: number, y: number) {
    const { scene } = this
    const fontSize = this.state.gridSize

    const wall = scene?.add.bitmapText(
      x * fontSize,
      y * fontSize,
      "Moho",
      "#",
      fontSize
    )

    wall.setAlpha(0.5)
  }

  public renderPlayer(x: number, y: number) {
    const { scene } = this

    return scene.add.text(x, y, '@')
  }

  public renderDoor(x: number, y: number) {
    const { scene } = this
    const fontSize = this.state.gridSize

    return scene?.add.bitmapText(x * fontSize, y * fontSize, "Moho", "D", fontSize)
  }
}