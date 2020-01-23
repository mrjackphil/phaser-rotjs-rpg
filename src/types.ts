export interface InputSystem {
  isLeft: () => boolean;
  isRight: () => boolean;
  isDown: () => boolean;
  isUp: () => boolean;
}

export interface CollisionSystem {
  isSolid: (s: Vector) => boolean
}

export interface GridSystem {
  getColCount: () => number;
  getRowCount: () => number;
  getTileSize: () => number;
  getCellCount: () => number;
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

export interface Updated {
  update: () => void
}

export interface Vector {
  x: number;
  y: number;
}
