import { GridVector } from "./types"
export default interface ICollision {
  isSolid: (s: GridVector) => boolean
  isEmpty: (s: GridVector) => boolean
}
