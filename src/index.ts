import Phaser from 'phaser'
import Input from './input'
import Player from './player'
import MapGenerator from './map'
import RendererText from './renderer'
import SolidManager from './solids'
import { getRandomNotSolidPosition } from './random'
import CollisionManager from './collision'
import { Updated, InputModel, SolidStateModel, CollisionModel, RendererModel, GridModel, PixelVector, GridVector, PlayerControllerModel } from './models/types'
import GridManager from './grid'
import GameObjectManager from './gameobject'
import { debug_setGlobal } from './debug'
import EventManager from './event'

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
  const grid: GridModel = new GridManager(50, 37, 16)
  const gameobjects = new GameObjectManager()
  const event = new EventManager()
  const solids: SolidStateModel = new SolidManager([ gameobjects ])
  const input: InputModel = new Input(scene)
  const renderer: RendererModel = new RendererText(scene, grid)
  const collision: CollisionModel = new CollisionManager(solids)
  const player: PlayerControllerModel = new Player(input, collision, renderer, grid)
  const map = new MapGenerator(renderer, solids, gameobjects, grid)

  map.generate()

  const randomEmptyCellPosition = getRandomNotSolidPosition(grid, collision)
  player.moveToCell(
    randomEmptyCellPosition.value.x,
    randomEmptyCellPosition.value.y
  )

  entitiesToUpdate.push(player)
  entitiesToUpdate.push(event)
  debug_setGlobal({event, scene, grid, gameobjects, solids, input, renderer, collision, player, map})
}

function update() {
  entitiesToUpdate.forEach(
    e => e.update()
  )
}
