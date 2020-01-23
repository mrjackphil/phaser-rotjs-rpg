import { State, Vector } from "./types"

export default class StateManager implements State {
  private solids: Vector[] = [];
  gridWidth: number = 50;
  gridHeight: number = 37;
  gridSize: number = 16;

  public addSolid(o: Vector) {
    this.solids.push(o)
  }

  public getSolids() {
    return this.solids
  }
}