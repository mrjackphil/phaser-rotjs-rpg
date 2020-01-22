import Phaser, { Renderer } from 'phaser'
import Input from './input'
import Player from './player'
import MapGenerator from './map'
import RendererText from './renderer'
import StateManager from './state'
import { generateRNGlocation } from './utils'

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
  const state = new StateManager
  const input: InputSystem = new Input(scene)
  const renderer = new RendererText(scene, state)
  const player = new Player(input, scene, renderer)
  const map = new MapGenerator(renderer, state)

  map.generate()

  const isSolid = (solids: Movable[], s: Movable) => {
    return solids.filter( e => e.x === s.x && e.y === s.y).length > 0
  }

  const getRandomNotSolidPosition = () => {
    const width = state.gridWidth
    const height = state.gridHeight

    const vect = generateRNGlocation(width, height)
    return isSolid( state.solids, vect )
      ? getRandomNotSolidPosition()
      : vect
  }

  const gen = getRandomNotSolidPosition()

  player.element.x = gen.x * state.gridSize
  player.element.y = gen.y * state.gridSize

  entitiesToUpdate.push(player)
}

function update() {
  entitiesToUpdate.forEach(
    e => e.update()
  )
}
