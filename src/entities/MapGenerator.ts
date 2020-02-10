import * as ROT from 'rot-js'
import Map from 'rot-js/lib/map/map'
import Digger from 'rot-js/lib/map/digger'
import IGameObjects from "../types/IGameObjects"
import IRenderer from "../types/IRenderer"
import IGrid from "../types/IGrid"

export default class MapGenerator {
  private render: IRenderer;
  private map: Map;
  private grid: IGrid;
  private gameObjects: IGameObjects;

  constructor(render: IRenderer, gameObjects: IGameObjects, grid: IGrid) {
    this.render = render
    this.grid = grid
    this.gameObjects = gameObjects
  }

  public generate() {
    const width = this.grid.getColCount()
    const height = this.grid.getRowCount()

    this.map = new ROT.Map.Digger(width, height)
    this.map.create(this.onCellRender.bind(this))
    this.drawDoors()
  }

  private drawDoors() {
    if (this.map instanceof Digger) {
      const rooms = this.map.getRooms();
      for (let i=0; i<rooms.length; i++) {
          const room = rooms[i];
          room.getDoors(this.onRenderDoors.bind(this));
      }
    }
  }

  private onCellRender(x: number, y: number, isWall: 0 | 1) {
    if (isWall) {
      const element = this.render.renderWall(x, y)
      this.gameObjects.addObject({ x, y, isSolid: true, element })
    }
  }

  private onRenderDoors(x: number, y: number) {
    const element = this.render.renderDoor(x, y)
    this.gameObjects.addObject({ x, y, isSolid: true, element })
  }
}