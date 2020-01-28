import { Vector } from "./types"
export default interface RendererModel {
  renderWall: (x: number, y: number) => void
  renderDoor: (x: number, y: number) => void
  renderPlayer: (x: number, y: number) => Vector
}
