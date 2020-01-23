export interface InputSystem {
  isLeft: () => boolean;
  isRight: () => boolean;
  isDown: () => boolean;
  isUp: () => boolean;
}

export interface State {
  solids: Vector[];
  gridWidth: number;
  gridHeight: number;
  gridSize: number;

  addSolid: (o: Vector) => void;
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