export interface PlayerControllerSystem extends Updated {
  moveToCell: (col: number, row: number) => void;
  getPixelPosition: () => PixelVector
  getGridPosition: () => GridVector
  getSpeed: () => number
  setSpeed: (speed: number) => number
}

export interface Updated {
  update: () => void
}

export interface InputSystem {
  isLeft: () => boolean;
  isRight: () => boolean;
  isDown: () => boolean;
  isUp: () => boolean;
}

export interface CollisionSystem {
  isSolid: (s: GridVector) => boolean;
  isEmpty: (s: GridVector) => boolean;
}

export interface GridSystem {
  getColCount: () => number;
  getRowCount: () => number;
  getTileSize: () => number;
  getCellCount: () => number;
}

export interface Vector {
  x: number;
  y: number;
}

export interface StateSystem {
  addSolid: (o: Vector) => void;
  getSolids: () => Vector[];
}

export interface RendererSystem {
  renderWall: (x: number, y: number) => void;
  renderDoor: (x: number, y: number) => void;
  renderPlayer: (x: number, y: number) => Vector;
}

export type VectorAlgebraicType = PixelVector | GridVector

export interface GridVector {
  kind: 'grid',
  value: Vector
}

export interface PixelVector {
  kind: 'pixel',
  value: Vector
}
