export default interface IGrid {
  getColCount: () => number
  getRowCount: () => number
  getTileSize: () => number
  getCellCount: () => number
}
