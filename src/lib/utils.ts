import { PixelVector, GridVector } from "../types/types"

export function findCenterPositionOfCell(tileSize: number, { value: vector }: GridVector): PixelVector {
  const value = { x: vector.x * tileSize, y: vector.y * tileSize }
  return { kind: 'pixel', value }
}

export function findCellInPosition(tileSize: number, { value: vector }: PixelVector): GridVector {
  const value = { x: Math.round(vector.x / tileSize), y: Math.round(vector.y / tileSize) };
  return { kind: 'grid', value }
}

