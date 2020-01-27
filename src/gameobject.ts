import { GameObjectEntity, ID, GameObjectSystem } from "./types"

export default class GameObjectManager implements GameObjectSystem {
  private objects: (GameObjectEntity & ID)[]= []

  public addObject(o: GameObjectEntity) {
    const maxID = this.objects.reduce( (acc, p) => acc > p.id ? acc : p.id, 0)
    const withID = { id: maxID + 1, ...o }
    this.objects.push(withID)

    return withID.id
  }

  public getObjects() {
    return this.objects
  }
}