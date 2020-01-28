import { SolidStateModel, CollisionModel, GridVector } from "./types"

export default class CollisionManager implements CollisionModel {
  private state: SolidStateModel;

  constructor(state: SolidStateModel) {
    this.state = state
  }

  public isEmpty(s: GridVector): boolean {
    return !this.isSolid(s)
  }

  public isSolid(s: GridVector): boolean {
    return this.state.getSolids().filter( e => e.x === s.value.x && e.y === s.value.y).length > 0
  }

}