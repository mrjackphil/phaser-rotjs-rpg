export default class StateManager {
  solids: Movable[] = [];
  gridWidth: number = 50;
  gridHeight: number = 37;
  gridSize: number = 16;

  public addSolid(o: Movable) {
    this.solids.push(o)
  }
}