import Phaser, { Renderer } from 'phaser'
import Input from './input'
import Player from './player'
import MapGenerator from './map'
import RendererText from './renderer'
import StateManager from './state'
import { RNG } from 'rot-js'

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
  const renderer = new RendererText(scene)
  const player = new Player(input, scene, renderer)
  const map = new MapGenerator(renderer, state)

  map.generate()

  const generateRNGlocation = (maxX: number, maxY: number): Movable => (
    {
      x: RNG.getUniformInt(0, maxX),
      y: RNG.getUniformInt(0, maxY)
    }
  )

  const isSolid = (solids: Movable[], s: Movable) => {
    return solids.filter( e => e.x === s.x && e.y === s.y).length > 0
  }

  const recursevlyCheckPosition = () => {
    const WIDTH = 50
    const HEIGHT = 37

    const vect = generateRNGlocation(WIDTH, HEIGHT)
    return isSolid( state.solids, vect )
      ? recursevlyCheckPosition()
      : vect
  }

  const gen = recursevlyCheckPosition()

  player.element.x = gen.x * 16
  player.element.y = gen.y * 16

  entitiesToUpdate.push(player)
}

function update() {
  entitiesToUpdate.forEach(
    e => e.update()
  )
}
