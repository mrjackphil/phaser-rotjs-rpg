import { ExternalSolidSource, GameObjectEntity, ID } from "./types"
import SolidStateModel from "./SolidStateModel"
export default interface GameObjectModel extends ExternalSolidSource, SolidStateModel {
  addObject: (o: GameObjectEntity) => ID["id"]
  getObjects: () => (GameObjectEntity & ID)[]
  removeObject: (id: number) => void
}
