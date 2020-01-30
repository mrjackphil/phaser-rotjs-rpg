import { Vector } from '../types/types'
import GridModel from "../types/GridModel"

export const gridMock: GridModel = {
  getTileSize: () => 0,
  getCellCount: () => 0,
  getColCount: () => 0,
  getRowCount: () => 0,
}

export const vectorMock: Vector = { x: 0, y: 0 }
