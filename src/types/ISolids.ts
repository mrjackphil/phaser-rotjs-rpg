import { Vector } from "./types"
export default interface ISolids {
  addSolid: (o: Vector) => void
  getSolids: () => Vector[]
}
