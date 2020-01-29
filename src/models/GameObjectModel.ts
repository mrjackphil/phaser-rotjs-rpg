import { GameObjectEntity, ID } from "./types"
import SolidStateModel from "./SolidStateModel"
export default interface GameObjectModel extends SolidStateModel {
  addObject: (o: GameObjectEntity) => ID["id"]
  getObjects: () => (GameObjectEntity & ID)[]
  removeObject: (id: number) => void
}
