import {ACTIONS} from "../entities/ActionDistributor"

export interface GameObjectEntity
  extends Vector, Partial<GameObjectParameters> {}

export interface GameObjectParameters {
  isSolid: boolean;
  element: any;
}

export interface Updated {
  update: () => void
}

export interface ID {
  id: number;
}

export interface Vector {
  x: number;
  y: number;
}

export type VectorAlgebraicType = PixelVector | GridVector

export interface GridVector {
  kind: 'grid';
  value: Vector;
}

export interface PixelVector {
  kind: 'pixel';
  value: Vector;
}

export interface Action<T = unknown> extends Partial<ID> {
  key: ACTIONS;
  action: (params: T) => void;
  params?: T;
}
