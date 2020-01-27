import { SolidStateSystem, Vector, FnPositionGetter } from "./types"

export default class SolidManager implements SolidStateSystem {
  private solids: Vector[] = [];
  private additionals: FnPositionGetter[];

  constructor(additionalSolidStates?: FnPositionGetter[]) {
    this.additionals = additionalSolidStates || []
  }

  public addSolid(o: Vector) {
    this.solids.push(o)
  }

  public getSolids() {
    const otherSolids = this.additionals
      .map( e => e() )
      .reduce( (acc, e) => acc.concat(e), [])
    return this.solids.concat(otherSolids)
  }
}