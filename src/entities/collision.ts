import { GridVector } from "../types/types"
import SolidStateModel from "../types/SolidStateModel"
import CollisionModel from "../types/CollisionModel"

export default class CollisionManager implements CollisionModel {
  private state: SolidStateModel;

  constructor(state: SolidStateModel) {
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