import { RNG } from "rot-js"
import { Vector, GridVector } from "../types/types"
import IGrid from "../types/IGrid"
import ICollision from "../types/ICollision"

export function generateRNGLocation(maxX: number, maxY: number): Vector {
  return {
    x: RNG.getUniformInt(0, maxX),
    y: RNG.getUniformInt(0, maxY)
  }
}

export function getRandomNotSolidPosition(grid: IGrid, collision: ICollision, count: number = 0): GridVector {
  let width = grid.getColCount()
  let height = grid.getRowCount()
  width ? width-- : 0
  height ? height-- : 0

  const vector = {
    kind: 'grid',
    value: generateRNGLocation(width, height)
  } as GridVector

  if (count && count > 100) {
    throw Error('Can\' find a not solid position. Function was called too many times')
  }

  return collision.isSolid( vector )
    ? getRandomNotSolidPosition(grid, collision, count + 1)
    : vector
}
