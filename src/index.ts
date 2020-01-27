import Phaser from 'phaser'
import Input from './input'
import Player from './player'
import MapGenerator from './map'
import RendererText from './renderer'
import StateManager from './state'
import { getRandomNotSolidPosition } from './random'
import CollisionManager from './collision'
import { Updated, InputSystem, StateSystem, CollisionSystem, RendererSystem, GridSystem, PixelVector, GridVector, PlayerControllerSystem } from './types'
import GridManager from './grid'

document.body.style.margin = "0"
document.body.style.padding = "0"
document.body.style.background = "black"

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
      preload: preload,
      create: create,
      update: update
  },
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.ScaleModes.FIT,
  },
  render: {
    // pixelArt: true
  }
}

// Init variables
const game = new Phaser.Game(config)
let entitiesToUpdate: Updated[] = []

function preload() {
  const scene: Phaser.Scene = this
  scene.load.bitmapFont(
    'Moho',
    './fonts/JetBrains Moho.png',
    './fonts/JetBrains Moho.fnt'
  )
}

// Scene functions
function create() {
  const scene = this as Phaser.Scene
  const grid: GridSystem = new GridManager(50, 37, 16)
  const state: StateSystem = new StateManager()
  const input: InputSystem = new Input(scene)
  const renderer: RendererSystem = new RendererText(scene, grid)
  const collision: CollisionSystem = new CollisionManager(state)
  const player: PlayerControllerSystem = new Player(input, collision, renderer, grid)
  const map = new MapGenerator(renderer, state, grid)

  map.generate()

  const randomEmptyCellPosition = getRandomNotSolidPosition(grid, collision)
  player.moveToCell(
    randomEmptyCellPosition.value.x,
    randomEmptyCellPosition.value.y
  )

  entitiesToUpdate.push(player)
}

function update() {
  entitiesToUpdate.forEach(
    e => e.update()
  )
}
