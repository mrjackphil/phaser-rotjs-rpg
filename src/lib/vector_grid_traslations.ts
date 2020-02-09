import { PixelVector, GridVector } from "../types/types"

export function findCenterPositionOfCell(
  tileSize: number,
  gridVector: GridVector
): PixelVector {
  const value = { x: gridVector.value.x * tileSize, y: gridVector.value.y * tileSize }
  return { kind: 'pixel', value }
}

export function findCellInPosition(
  tileSize: number,
  pixelVector: PixelVector
): GridVector {
  const value = {
    x: Math.round(pixelVector.value.x / tileSize),
    y: Math.round(pixelVector.value.y / tileSize)
  };
  return { kind: 'grid', value }
}

