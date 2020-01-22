export default class StateManager {
  solids: Movable[] = [];

  public addSolid(o: Movable) {
    this.solids.push(o)
  }
}