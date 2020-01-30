import {GameObjectEntity, ID, Vector} from "../types/types"
import GameObjectModel from "../types/GameObjectModel"

export default class GameObjectManager implements GameObjectModel {
  private objects: (GameObjectEntity & ID)[]= [];
  private lastId: number = 0;

  public addObject(o: GameObjectEntity) {
    const withID = { id: this.lastId, ...o }
    this.lastId++

    this.objects.push(withID)

    return withID.id
  }

  public addSolid(o: GameObjectEntity) {
    const solid = { ...o, isSolid: true }
    return this.addObject(solid)
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

  public getObjectByID(id: number) {
    return this.getObjects()
        .filter( object => object.id === id)[0]
  }

  public getIDByPosition({x, y} : Vector) {
    return this.getObjects()
        .filter( obj => obj.x === x && obj.y === y )
        .map( obj => obj.id )
  }
}