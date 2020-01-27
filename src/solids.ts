import { SolidStateSystem, Vector } from "./types"

export default class SolidManager implements SolidStateSystem {
  private solids: Vector[] = [];
  private additionals: Array<() => Vector[]>;

  constructor(additionalSolidStates?: Array<() => Vector[]>) {
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