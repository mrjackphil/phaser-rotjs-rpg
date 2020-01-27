import { expect } from 'chai'
import 'mocha'
import GameObjectManager from './gameobject'
import { GameObjectEntity } from './types'

describe('Game object methods', () => {
  it('Add gameobject returns id', () => {
    const gameobject = new GameObjectManager()
    const object: GameObjectEntity = { position: { x: 0, y: 0 } }

    const id = gameobject.addObject(object)
    expect(id).to.be.a('number')
  })

  it('Add game object', () => {
    const gameobject = new GameObjectManager()
    const object: GameObjectEntity = { position: { x: 0, y: 0 } }

    gameobject.addObject(object)

    expect(gameobject.getObjects().length).to.be.eq(1)
  })
})