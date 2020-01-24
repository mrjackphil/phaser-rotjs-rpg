import { RNG } from "rot-js"
import { Vector, GridSystem, PixelVector, GridVector } from "./types"

export function generateRNGlocation(maxX: number, maxY: number): Vector {
  return {
    x: RNG.getUniformInt(0, maxX),
    y: RNG.getUniformInt(0, maxY)
  }
}

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

