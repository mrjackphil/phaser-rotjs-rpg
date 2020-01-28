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
  private state: SolidStateModel;
  private gameobjects: GameObjectModel;

  constructor(render: RendererModel, state: SolidStateModel, gameobjects: GameObjectModel, grid: GridModel) {
    this.render = render
    this.grid = grid
    this.state= state
    this.gameobjects = gameobjects
  }

  public generate() {
    const width = this.grid.getColCount()
    const height = this.grid.getRowCount()

    this.map = new ROT.Map.Digger(width, height)
    this.map.create(this.mapgenCallback.bind(this))
    this.drawDoors()
  }

  private drawDoors() {
    if (this.map instanceof Digger) {
      const rooms = this.map.getRooms();
      for (var i=0; i<rooms.length; i++) {
          var room = rooms[i];
          room.getDoors(this.renderDoors.bind(this));
      }
    }
  }

  private mapgenCallback(x: number, y: number, isWall: 0 | 1) {
    if (isWall) {
      this.renderWall(x, y)
      this.state.addSolid({ x, y })
    }
  }

  private renderWall(x: number, y: number) {
    this.render.renderWall(x, y)
  }

  private renderDoors(x: number, y: number) {
    const element = this.render.renderDoor(x, y)
    this.gameobjects.addObject({ x, y, isSolid: true, element })
  }
}