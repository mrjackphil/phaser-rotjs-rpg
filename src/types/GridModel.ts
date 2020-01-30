export default interface GridModel {
  getColCount: () => number
  getRowCount: () => number
  getTileSize: () => number
  getCellCount: () => number
}
