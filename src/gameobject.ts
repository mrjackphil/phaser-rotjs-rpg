import { GameObjectEntity, ID, GameObjectSystem } from "./types"

export default class GameObjectManager implements GameObjectSystem {
  private objects: (GameObjectEntity & ID)[]= [];
  private lastId: number = 0;

  public addObject(o: GameObjectEntity) {
    const withID = { id: this.lastId, ...o }
    this.lastId++

    this.objects.push(withID)

    return withID.id
  }

  public removeObject(id: number) {
    this.objects = this.objects.filter(e => e.id !== id)
  }

  public getObjects() {
    return this.objects
  }

  public getSolids() {
    return this.getObjects().filter( e => e.isSolid)
  }
}