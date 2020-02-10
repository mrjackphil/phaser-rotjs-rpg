import Phaser from 'phaser'
import InputManager from './entities/InputManager'
import PlayerController from './entities/PlayerController'
import MapGenerator from './entities/MapGenerator'
import RendererText from './entities/RendererText'
import {getRandomNotSolidPosition} from './lib/random'
import CollisionManager from './entities/CollisionManager'
import {Updated} from './types/types'
import IRenderer from "./types/IRenderer"
import IInput from "./types/IInput"
import IGrid from "./types/IGrid"
import ICollision from "./types/ICollision"
import IPlayerController from "./types/IPlayerController"
import GridManager from './entities/GridManager'
import GameObjectManager from './entities/GameObjectManager'
import {debug_setGlobal} from './lib/debug'
import EventManager from './entities/EventManager'
import IEvent from './types/IEvent'
import IGameObjects from './types/IGameObjects'
import ActionDistributor, {ACTIONS} from "./entities/ActionDistributor"

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
new Phaser.Game(config)
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
  const grid: IGrid = new GridManager(50, 37, 16)
  const gameObjects: IGameObjects = new GameObjectManager()
  const event: IEvent = new EventManager()
  const input: IInput = new InputManager(scene)
  const renderer: IRenderer = new RendererText(scene, grid)
  const collision: ICollision = new CollisionManager(gameObjects)
  const player: IPlayerController = new PlayerController(
    input,
    collision.isEmpty,
    renderer.renderPlayer,
    grid.getTileSize()
  )
  const map = new MapGenerator(renderer, gameObjects, grid)

  map.generate()

  const randomEmptyCellPosition = getRandomNotSolidPosition(grid, collision)
  player.moveToCell(
    randomEmptyCellPosition.value.x,
    randomEmptyCellPosition.value.y
  )

  entitiesToUpdate.push(player)
  entitiesToUpdate.push(event)

  debugAction(event)
  debug_setGlobal({
    event,
    scene,
    grid,
    objects: gameObjects,
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

function debugAction(eventManager: IEvent) {
  const actions = new ActionDistributor()
  const open_door = actions.getAction(ACTIONS.OPEN_DOOR, { position: { x: 0, y: 0 } })

  addEventListener('keydown', (ev) => {
    if (ev.key === 'e') {
      eventManager.add(open_door)
    }
  })
}
