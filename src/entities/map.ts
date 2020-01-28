import * as ROT from 'rot-js'
import Map from 'rot-js/lib/map/map'
import Digger from 'rot-js/lib/map/digger'
import GameObjectModel from "../models/GameObjectModel"
import RendererModel from "../models/RendererModel"
import SolidStateModel from "../models/SolidStateModel"
import GridModel from "../models/GridModel"

export default class MapGenerator {
  private render: RendererModel;
  private map: Map;
  private grid: GridModel;
  private gameobjects: GameObjectModel;

  constructor(render: RendererModel, gameobjects: GameObjectModel, grid: GridModel) {
    this.render = render
    this.grid = grid
    this.gameobjects = gameobjects
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
      for (var i=0; i<rooms.length; i++) {
          var room = rooms[i];
          room.getDoors(this.onRenderDoors.bind(this));
      }
    }
  }

  private onCellRender(x: number, y: number, isWall: 0 | 1) {
    if (isWall) {
      this.onRenderWall(x, y)
      this.gameobjects.addSolid({ x, y })
    }
  }

  private onRenderWall(x: number, y: number) {
    this.render.renderWall(x, y)
  }

  private onRenderDoors(x: number, y: number) {
    const element = this.render.renderDoor(x, y)
    this.gameobjects.addObject({ x, y, isSolid: true, element })
  }
}