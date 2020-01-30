import { Vector } from "./types"
export default interface SolidStateModel {
  addSolid: (o: Vector) => void
  getSolids: () => Vector[]
}
