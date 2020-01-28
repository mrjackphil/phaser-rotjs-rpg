import { PixelVector, GridVector } from "../models/types"
import GridModel from "../models/GridModel"

export function findCenterPositionOfCell(grid: GridModel, { value: vect }: GridVector): PixelVector {
  const size = grid.getTileSize()
  const value = { x: vect.x * size, y: vect.y * size }
  return { kind: 'pixel', value }
}

export function findCellInPosition(grid: GridModel, { value: vect }: PixelVector): GridVector {
  const size = grid.getTileSize()
  const value = { x: Math.round(vect.x / size), y: Math.round(vect.y / size) };
  return { kind: 'grid', value }
}

