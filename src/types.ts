export interface InputSystem {
  isLeft: () => boolean;
  isRight: () => boolean;
  isDown: () => boolean;
  isUp: () => boolean;
}

export interface CollisionSystem {
  isSolid: (s: Vector) => boolean
}

export interface Grid {
  // width: number;
  // height: number;
  // tileSize: number;
  // gridSize: number;
  getColCount: () => number;
  getRowCount: () => number;
  getTileSize: () => number;
  getCellCount: () => number;
}

export interface State {
  addSolid: (o: Vector) => void;
  getSolids: () => Vector[];
}

export interface Updated {
  update: () => void
}

export interface Vector {
  x: number;
  y: number;
}

export interface Renderer {
  renderWall: (x: number, y: number) => void;
  renderDoor: (x: number, y: number) => void;
  renderPlayer: (x: number, y: number) => Vector;
}