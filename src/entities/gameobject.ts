import { GameObjectEntity, ID } from "../models/types"
import GameObjectModel from "../models/GameObjectModel"

export default class GameObjectManager implements GameObjectModel {
  private objects: (GameObjectEntity & ID)[]= [];
  private lastId: number = 0;

  public addObject(o: GameObjectEntity) {
    const withID = { id: this.lastId, ...o }
    this.lastId++

    this.objects.push(withID)

    return withID.id
  }

  public removeObject(id: number) {
    this.objects
      .filter(e => e.id === id)
      .forEach(e => e?.element?.destroy())
    this.objects = this.objects.filter(e => e.id !== id)
  }

  public getObjects() {
    return this.objects
  }

  public getSolids() {
    return this.getObjects().filter( e => e.isSolid)
  }
}