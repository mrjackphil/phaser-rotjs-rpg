interface InputSystem {
  isLeft: () => boolean;
  isRight: () => boolean;
  isDown: () => boolean;
  isUp: () => boolean;
}

interface Updated {
  update: () => void
}

interface Movable {
  x: number;
  y: number;
}

interface Renderer {
  renderWall: (x: number, y: number) => void;
  renderDoor: (x: number, y: number) => void;
  renderPlayer: (x: number, y: number) => Movable;
}