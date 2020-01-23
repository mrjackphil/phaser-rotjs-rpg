import { StateSystem, Vector } from "./types"

export default class StateManager implements StateSystem {
  private solids: Vector[] = [];

  public addSolid(o: Vector) {
    this.solids.push(o)
  }

  public getSolids() {
    return this.solids
  }
}