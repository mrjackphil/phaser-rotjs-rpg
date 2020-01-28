// GameObjects
export interface GameObjectSystem extends ExternalSolidSource {
  addObject: (o: GameObjectEntity) => ID["id"];
  getObjects: () => (GameObjectEntity & ID)[];
  removeObject: (id: number) => void;
}

export interface ExternalSolidSource {
  getSolids: () => Vector[]
}

export interface GameObjectEntity
  extends Vector, Partial<GameObjectParameters> {}

export interface GameObjectParameters {
  isSolid: boolean;
  element: any;
}
// Player Management
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

export interface ID {
  id: number;
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

export interface SolidStateSystem {
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

export interface Action extends Partial<ID> {
  action: () => {}
}
