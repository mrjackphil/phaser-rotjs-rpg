import { GridSystem, PixelVector, GridVector } from "./types"

export function gridToPixelVector(grid: GridSystem, { value: vect }: GridVector): PixelVector {
  const size = grid.getTileSize()
  const value = { x: vect.x * size, y: vect.y * size }
  return { kind: 'pixel', value }
}

export function pixelToGridVector(grid: GridSystem, { value: vect }: PixelVector): GridVector {
  const size = grid.getTileSize()
  const value = { x: Math.round(vect.x / size), y: Math.round(vect.y / size) };
  return { kind: 'grid', value }
}

