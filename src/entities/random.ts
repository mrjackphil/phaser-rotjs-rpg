import { RNG } from "rot-js"
import { Vector, GridVector } from "../models/types"
import GridModel from "../models/GridModel"
import CollisionModel from "../models/CollisionModel"

export function generateRNGlocation(maxX: number, maxY: number): Vector {
  return {
    x: RNG.getUniformInt(0, maxX),
    y: RNG.getUniformInt(0, maxY)
  }
}

export function getRandomNotSolidPosition(grid: GridModel, collision: CollisionModel, count: number = 0): GridVector {
  let width = grid.getColCount()
  let height = grid.getRowCount()
  width ? width-- : 0
  height ? height-- : 0

  const vect = {
    kind: 'grid',
    value: generateRNGlocation(width, height)
  } as GridVector

  if (count && count > 100) {
    throw Error('Can\' find a not solid position. Function was called too many times')
  }

  return collision.isSolid( vect )
    ? getRandomNotSolidPosition(grid, collision, count + 1)
    : vect
}
