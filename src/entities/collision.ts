import { GridVector } from "../types/types"
import ISolids from "../types/ISolids"
import ICollision from "../types/ICollision"

export default class CollisionManager implements ICollision {
  private state: ISolids;

  constructor(state: ISolids) {
    this.state = state

    this.isEmpty = this.isEmpty.bind(this)
    this.isSolid = this.isSolid.bind(this)
  }

  public isEmpty(s: GridVector): boolean {
    return !this.isSolid(s)
  }

  public isSolid(s: GridVector): boolean {
    return this.state.getSolids().filter( e => e.x === s.value.x && e.y === s.value.y).length > 0
  }

}