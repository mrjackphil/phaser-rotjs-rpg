import {GameObjectEntity, ID, Vector} from "./types"
import SolidStateModel from "./SolidStateModel"

export default interface GameObjectModel extends SolidStateModel {
  addObject: (o: GameObjectEntity) => ID["id"]
  getObjects: () => (GameObjectEntity & ID)[]
  removeObject: (id: number) => void
  getIDByPosition: (vector: Vector) => number[]
}
