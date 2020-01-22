export default class StateManager {
  solid: Movable[] = [];

  private addSolid(o: Movable) {
    this.solid.push(o)
  }
}