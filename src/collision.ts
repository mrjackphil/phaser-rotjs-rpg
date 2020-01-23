import StateManager from "./state"

export default class CollisionManager {
  state: StateManager;

  constructor(state: StateManager) {
    this.state = state
  }

  public isSolid(s: Vector) {
    return this.state.solids.filter( e => e.x === s.x && e.y === s.y).length > 0
  }

}