import { State, Vector, CollisionSystem } from "./types"

export default class CollisionManager implements CollisionSystem {
  private state: State;

  constructor(state: State) {
    this.state = state
  }

  public isSolid(s: Vector): boolean {
    return this.state.getSolids().filter( e => e.x === s.x && e.y === s.y).length > 0
  }

}