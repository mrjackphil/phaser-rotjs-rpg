import { Vector, GridVector, PixelVector, VectorAlgebraicType } from "./types"

export function createGridVector(value: Vector): GridVector {
  return { kind: 'grid', value }
}

export function createPixelVector(value: Vector): PixelVector {
  return { kind: 'pixel', value }
}

type ConvertedVector<T> = T extends GridVector ? PixelVector : GridVector
export function convertVectorType<T extends VectorAlgebraicType>(vector: T): ConvertedVector<T> {
  if (vector.kind === 'pixel') {
    return createGridVector(vector.value) as ConvertedVector<T>
  } else {
    return createPixelVector(vector.value) as ConvertedVector<T>
  }
}
