import { RendererModel, GridModel } from "../models/types"

export default class RendererText implements RendererModel {
  scene: Phaser.Scene
  grid: GridModel

  constructor(scene: Phaser.Scene, grid: GridModel) {
    this.scene = scene
    this.grid = grid
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

  public renderPlayer(x: number, y: number) {
    const { scene } = this

    return scene.add.text(x, y, '@')
  }

  public renderDoor(x: number, y: number) {
    const { scene } = this
    const fontSize = this.grid.getTileSize()

    return scene?.add.bitmapText(x * fontSize, y * fontSize, "Moho", "D", fontSize)
  }
}