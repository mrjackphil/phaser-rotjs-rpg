import { SolidStateSystem, CollisionSystem, GridVector } from "./types"

export default class CollisionManager implements CollisionSystem {
  private state: SolidStateSystem;

  constructor(state: SolidStateSystem) {
    this.state = state
  }

  public isEmpty(s: GridVector): boolean {
    return !this.isSolid(s)
  }

  public isSolid(s: GridVector): boolean {
    return this.state.getSolids().filter( e => e.x === s.value.x && e.y === s.value.y).length > 0
  }

}