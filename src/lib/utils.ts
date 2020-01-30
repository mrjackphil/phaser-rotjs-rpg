import { PixelVector, GridVector } from "../types/types"

export function findCenterPositionOfCell(tilesize: number, { value: vect }: GridVector): PixelVector {
  const value = { x: vect.x * tilesize, y: vect.y * tilesize }
  return { kind: 'pixel', value }
}

export function findCellInPosition(tilesize: number, { value: vect }: PixelVector): GridVector {
  const value = { x: Math.round(vect.x / tilesize), y: Math.round(vect.y / tilesize) };
  return { kind: 'grid', value }
}

