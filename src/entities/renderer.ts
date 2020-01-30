import RendererModel from "../types/RendererModel"
import GridModel from "../types/GridModel"

export default class RendererText implements RendererModel {
  scene: Phaser.Scene
  grid: GridModel

  constructor(scene: Phaser.Scene, grid: GridModel) {
    this.scene = scene
    this.grid = grid

    this.renderDoor = this.renderDoor.bind(this)
    this.renderPlayer = this.renderPlayer.bind(this)
    this.renderWall = this.renderWall.bind(this)
  }

  public renderWall(x: number, y: number) {
    const { scene } = this
    const fontSize = this.grid.getTileSize()

    const wall = scene?.add.bitmapText(
      x * fontSize,
      y * fontSize,
      "Moho",
      "#",
      fontSize
    )

    wall.setAlpha(0.5)
  }

  public renderPlayer(x: number = 0, y: number = 0) {
    const { scene } = this

    return scene.add.text(x, y, '@')
  }

  public renderDoor(x: number, y: number) {
    const { scene } = this
    const fontSize = this.grid.getTileSize()

    return scene?.add.bitmapText(x * fontSize, y * fontSize, "Moho", "D", fontSize)
  }
}