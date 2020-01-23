import Phaser from 'phaser'
import Input from './input'
import Player from './player'
import MapGenerator from './map'
import RendererText from './renderer'
import StateManager from './state'
import { generateRNGlocation } from './utils'
import CollisionManager from './collision'
import { Updated, InputSystem, StateSystem, CollisionSystem, RendererSystem, GridSystem } from './types'
import GridManager from './grid'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
      preload: preload,
      create: create,
      update: update
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
  const player = new Player(input, collision, renderer, grid)
  const map = new MapGenerator(renderer, state, grid)

  map.generate()

  const getRandomNotSolidPosition = () => {
    const width = grid.getColCount()
    const height = grid.getRowCount()

    const vect = generateRNGlocation(width, height)
    return collision.isSolid( vect )
      ? getRandomNotSolidPosition()
      : vect
  }

  const gen = getRandomNotSolidPosition()

  player.element.x = gen.x * grid.getColCount()
  player.element.y = gen.y * grid.getRowCount()

  entitiesToUpdate.push(player)
}

function update() {
  entitiesToUpdate.forEach(
    e => e.update()
  )
}
