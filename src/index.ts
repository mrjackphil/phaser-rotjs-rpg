import Phaser from 'phaser'
import InputManager from './entities/InputManager'
import PlayerController from './entities/PlayerController'
import MapGenerator from './entities/MapGenerator'
import RendererText from './entities/RendererText'
import {getRandomNotSolidPosition} from './lib/random'
import CollisionManager from './entities/CollisionManager'
import {GridVector, Updated} from './types/types'
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
import {createGridVectorType} from "./lib/vector_type_transform"

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

  debugAction(player, gameObjects, event)
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

function debugAction(
  character: IPlayerController,
  gameObjects: IGameObjects,
  eventManager: IEvent
) {
  const actions = new ActionDistributor()

  function getNearbyGridPositions(gridPosition: GridVector) {
    const { value } = gridPosition
    const { x, y } = value

    const topLeft       =  { x: x - 1, y: y - 1 }
    const topCenter     =  { x,        y: y - 1 }
    const topRight      =  { x: x + 1, y: y - 1 }
    const middleLeft    =  { x: x - 1, y }
    const middleCenter  =  { x,        y }
    const middleRight   =  { x: x + 1, y }
    const bottomLeft    =  { x: x - 1, y: y + 1 }
    const bottomCenter  =  { x,        y: y + 1 }
    const bottomRight   =  { x: x + 1, y: y + 1 }

    return [
      topLeft, topCenter, topRight,
      middleLeft, middleCenter, middleRight,
      bottomLeft, bottomCenter, bottomRight
    ].map( e => createGridVectorType(e) )
  }

  function createAction() {
    const positions = getNearbyGridPositions(character.getGridPosition())

    return positions.map( position => {
      return actions.getAction(
        ACTIONS.REMOVE_DOOR,
        {
          position,
          objects: gameObjects
        }
      )
    })
  }

  addEventListener('keydown', (ev) => {
    if (ev.key === 'e') {
      const open_door_actions = createAction()

      open_door_actions.forEach( action => {
        eventManager.add(action)
      })
    }
  })
}
