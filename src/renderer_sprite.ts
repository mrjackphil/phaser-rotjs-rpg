import { RendererSystem, GridSystem } from "./types"

export default class RendererSprite implements RendererSystem {
  scene: Phaser.Scene
  grid: GridSystem

  constructor(scene: Phaser.Scene, grid: GridSystem) {
    this.scene = scene
    this.grid = grid
  }

  public renderWall(x: number, y: number) {
    const { scene } = this
    const fontSize = this.grid.getTileSize()

    const sprite = scene.add.sprite(x * fontSize, y * fontSize, 'wall')
    sprite.setDisplaySize(fontSize, fontSize)
    sprite.setOrigin(0, 0)

    return sprite
  }

  public renderPlayer(x: number, y: number) {
    const { scene } = this
    const fontSize = this.grid.getTileSize()

    const sprite = scene.add.sprite(x, y, 'player')
    sprite.setDisplaySize(fontSize, fontSize)
    sprite.setOrigin(0, 0)
    sprite.setDepth(1)

    return sprite
  }

  public renderDoor(x: number, y: number) {
    const { scene } = this
    const fontSize = this.grid.getTileSize()

    const sprite = scene.add.sprite(x * fontSize, y * fontSize, 'door')
    sprite.setDisplaySize(fontSize, fontSize)
    sprite.setOrigin(0, 0)

    return sprite
  }
}