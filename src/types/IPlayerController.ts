import { Updated, PixelVector, GridVector } from "./types"
// Player Management
export default interface IPlayerController extends Updated {
  moveToCell: (col: number, row: number) => void
  getPixelPosition: () => PixelVector
  getGridPosition: () => GridVector
  getSpeed: () => number
  setSpeed: (speed: number) => number
}
