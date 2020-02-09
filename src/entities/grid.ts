import IGrid from "../types/IGrid"

export default class GridManager implements IGrid {
  private readonly columns: number;
  private readonly rows: number;
  private readonly tileSize: number;

  constructor(col: number, row: number, tileSize: number = 16) {
    this.columns = col
    this.rows = row
    this.tileSize = tileSize
  }

  public getColCount() {
    return this.columns
  }

  public getRowCount() {
    return this.rows
  }

  public getTileSize() {
    return this.tileSize
  }

  public getCellCount() {
    return this.columns * this.rows
  }

}