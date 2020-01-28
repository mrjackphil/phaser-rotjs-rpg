import { Vector, GridVector, PixelVector, VectorAlgebraicType } from "../models/types"

export function createGridVectorType(value: Vector): GridVector {
  return { kind: 'grid', value }
}

export function createPixelVectorType(value: Vector): PixelVector {
  return { kind: 'pixel', value }
}

type ConvertedVector<T> = T extends GridVector ? PixelVector : GridVector
export function convertVectorType<T extends VectorAlgebraicType>(vector: T): ConvertedVector<T> {
  if (vector.kind === 'pixel') {
    return createGridVectorType(vector.value) as ConvertedVector<T>
  } else {
    return createPixelVectorType(vector.value) as ConvertedVector<T>
  }
}
