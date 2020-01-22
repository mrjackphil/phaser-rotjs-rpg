import * as ROT from 'rot-js'
import Map from 'rot-js/lib/map/map'
import Digger from 'rot-js/lib/map/digger'

const WIDTH = 50
const HEIGHT = 37

export default class MapGenerator {
  render: Renderer;
  map: Map;

  constructor(render: Renderer) {
    this.render = render
  }

  public generate(scene?: Phaser.Scene) {
    this.map = new ROT.Map.Digger(WIDTH, HEIGHT)
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
    }
  }

  private renderWall(x: number, y: number) {
    this.render.renderWall(x, y)
  }

  private renderDoors(x: number, y: number) {
    this.render.renderDoor(x, y)
  }
}