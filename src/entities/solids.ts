import { SolidStateModel, Vector, ExternalSolidSource } from "../models/types"

export default class SolidManager implements SolidStateModel {
  private solids: Vector[] = [];
  private additionals: ExternalSolidSource[];

  constructor(additionalSolidStates?: ExternalSolidSource[]) {
    this.additionals = additionalSolidStates || []
  }

  public addSolid(o: Vector) {
    this.solids.push(o)
  }

  public getSolids() {
    const otherSolids = this.additionals
      .map( e => e.getSolids() )
      .reduce( (acc, e) => acc.concat(e), [])
    return this.solids.concat(otherSolids)
  }
}