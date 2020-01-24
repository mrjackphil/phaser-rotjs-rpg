import { RNG } from "rot-js"
import { GridSystem, CollisionSystem, Vector, GridVector } from "./types"

export function generateRNGlocation(maxX: number, maxY: number): Vector {
  return {
    x: RNG.getUniformInt(0, maxX),
    y: RNG.getUniformInt(0, maxY)
  }
}

export function getRandomNotSolidPosition(grid: GridSystem, collision: CollisionSystem): GridVector {
  const width = grid.getColCount()
  const height = grid.getRowCount()
  const vect = { kind: 'grid', value: generateRNGlocation(width, height) } as GridVector

  return collision.isSolid( vect )
    ? getRandomNotSolidPosition(grid, collision)
    : vect
}
