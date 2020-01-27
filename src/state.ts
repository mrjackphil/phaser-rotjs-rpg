import { SolidStateSystem, Vector } from "./types"

export default class SolidManager implements SolidStateSystem {
  private solids: Vector[] = [];

  public addSolid(o: Vector) {
    this.solids.push(o)
  }

  public getSolids() {
    return this.solids
  }
}