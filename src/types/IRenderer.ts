import {Destroyable, Vector} from "./types"
export default interface IRenderer {
  renderWall: (x: number, y: number) => Vector & Destroyable
  renderDoor: (x: number, y: number) => Vector & Destroyable
  renderPlayer: (x?: number, y?: number) => Vector & Destroyable
}
