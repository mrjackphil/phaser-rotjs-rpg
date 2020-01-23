import { RNG } from "rot-js"

export function generateRNGlocation(maxX: number, maxY: number): Vector {
  return {
    x: RNG.getUniformInt(0, maxX - 1),
    y: RNG.getUniformInt(0, maxY - 1)
  }
}
