import * as ROT from 'rot-js'
import Map from 'rot-js/lib/map/map'
import Digger from 'rot-js/lib/map/digger'
import { RendererSystem, SolidStateSystem, GridSystem } from './types'

export default class MapGenerator {
  private render: RendererSystem;
  private map: Map;
  private grid: GridSystem
  private state: SolidStateSystem

  constructor(render: RendererSystem, state: SolidStateSystem, grid: GridSystem) {
    this.render = render
    this.grid = grid
    this.state= state
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
    this.render.renderDoor(x, y)
  }
}