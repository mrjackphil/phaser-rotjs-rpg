import { ExternalSolidSource, GameObjectEntity, ID } from "./types"
export default interface GameObjectModel extends ExternalSolidSource {
  addObject: (o: GameObjectEntity) => ID["id"]
  getObjects: () => (GameObjectEntity & ID)[]
  removeObject: (id: number) => void
}
