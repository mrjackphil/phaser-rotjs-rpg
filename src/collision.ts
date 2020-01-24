import { StateSystem, Vector, CollisionSystem, GridVector } from "./types"

export default class CollisionManager implements CollisionSystem {
  private state: StateSystem;

  constructor(state: StateSystem) {
    this.state = state
  }

  public isSolid(s: GridVector): boolean {
    return this.state.getSolids().filter( e => e.x === s.value.x && e.y === s.value.y).length > 0
  }

}