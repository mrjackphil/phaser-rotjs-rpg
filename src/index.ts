import Phaser from 'phaser'
import Input from './entities/input'
import Player from './entities/player'
import MapGenerator from './entities/map'
import RendererText from './entities/renderer'
import { getRandomNotSolidPosition } from './entities/random'
import CollisionManager from './entities/collision'
import { Updated } from './models/types'
import RendererModel from "./models/RendererModel"
import InputModel from "./models/InputModel"
import GridModel from "./models/GridModel"
import CollisionModel from "./models/CollisionModel"
import PlayerControllerModel from "./models/PlayerControllerModel"
import GridManager from './entities/grid'
import GameObjectManager from './entities/gameobject'
import { debug_setGlobal } from './lib/debug'
import EventManager from './entities/event'

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
  const input: InputModel = new Input(scene)
  const renderer: RendererModel = new RendererText(scene, grid)
  const collision: CollisionModel = new CollisionManager(gameobjects)
  const player: PlayerControllerModel = new Player(
    input,
    collision.isEmpty,
    renderer.renderPlayer,
    grid.getTileSize()
  )
  const map = new MapGenerator(renderer, gameobjects, gameobjects, grid)

  map.generate()

  const randomEmptyCellPosition = getRandomNotSolidPosition(grid, collision)
  player.moveToCell(
    randomEmptyCellPosition.value.x,
    randomEmptyCellPosition.value.y
  )

  entitiesToUpdate.push(player)
  entitiesToUpdate.push(event)

  debug_setGlobal({
    event,
    scene,
    grid,
    gameobjects,
    input,
    renderer,
    collision,
    player,
    map
  })
}

function update() {
  entitiesToUpdate.forEach(
    e => e.update()
  )
}
