import * as ROT from 'rot-js'
import Map from 'rot-js/lib/map/map'
import Digger from 'rot-js/lib/map/digger'
import StateManager from './state'
import { Renderer } from './types'

export default class MapGenerator {
  render: Renderer;
  map: Map;
  state: StateManager

  constructor(render: Renderer, state: StateManager) {
    this.render = render
    this.state = state
  }

  public generate() {
    const width = this.state.gridWidth
    const height = this.state.gridHeight

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