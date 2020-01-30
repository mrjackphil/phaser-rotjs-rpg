import { GridVector } from "./types"
export default interface CollisionModel {
  isSolid: (s: GridVector) => boolean
  isEmpty: (s: GridVector) => boolean
}
