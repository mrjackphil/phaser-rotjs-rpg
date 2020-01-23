import { StateSystem, Vector, CollisionSystem } from "./types"

export default class CollisionManager implements CollisionSystem {
  private state: StateSystem;

  constructor(state: StateSystem) {
    this.state = state
  }

  public isSolid(s: Vector): boolean {
    return this.state.getSolids().filter( e => e.x === s.x && e.y === s.y).length > 0
  }

}