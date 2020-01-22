const FONT_SIZE = 16
export default class RendererText implements Renderer {
  scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  public renderWall(x: number, y: number) {
    const { scene } = this
    const fontSize = FONT_SIZE

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
    const fontSize = FONT_SIZE

    return scene?.add.bitmapText(x * fontSize, y * fontSize, "Moho", "D", fontSize)
  }
}