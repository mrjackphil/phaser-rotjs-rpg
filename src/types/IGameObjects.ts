import {GameObjectEntity, ID, Vector} from "./types"
import ISolids from "./ISolids"

export default interface IGameObjects extends ISolids {
  addObject: (o: GameObjectEntity) => ID["id"]
  getObjects: () => (GameObjectEntity & ID)[]
  removeObject: (id: number) => void
  getIDByPosition: (vector: Vector) => number[]
}
