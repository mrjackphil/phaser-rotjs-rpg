import { expect } from 'chai'
import 'mocha'
import GameObjectManager from '../entities/gameobject'
import { GameObjectEntity } from '../types/types'

describe('Game object methods', () => {
  it('Add game object returns id', () => {
    const gameObjectManager = new GameObjectManager()
    const object: GameObjectEntity = { x: 0, y: 0 }

    const id = gameObjectManager.addObject(object)
    expect(id).to.be.a('number')
  })

  it('Add several object will increase the id number', () => {
    const gameObjectManager = new GameObjectManager()
    const object: GameObjectEntity = { x: 0, y: 0 }

    const id1 = gameObjectManager.addObject(object)
    const id2 = gameObjectManager.addObject(object)
    const id3 = gameObjectManager.addObject(object)

    expect([id1, id2, id3]).to.be.deep.eq([0, 1, 2])
  })

  it('Add game object', () => {
    const gameObjectManager = new GameObjectManager()
    const object: GameObjectEntity = { x: 0, y: 0 }

    gameObjectManager.addObject(object)

    expect(gameObjectManager.getObjects().length).to.be.eq(1)
  })

  it('Remove game object', () => {
    const gameObjectManager = new GameObjectManager()
    const object: GameObjectEntity = { x: 0, y: 0 }

    gameObjectManager.addObject(object)
    const willRemove = gameObjectManager.addObject(object)
    gameObjectManager.addObject(object)
    gameObjectManager.removeObject(willRemove)

    expect(gameObjectManager.getObjects().length).to.be.eq(2)
  })

  it('Unique ids for each added game object', () => {
    const gameObjectManager = new GameObjectManager()
    const object: GameObjectEntity = { x: 0, y: 0 }

    gameObjectManager.addObject(object)
    gameObjectManager.addObject(object)
    const willRemove = gameObjectManager.addObject(object)

    gameObjectManager.removeObject(willRemove)
    const lastAdded = gameObjectManager.addObject(object)

    expect(lastAdded).to.be.eq(3)
  })

  it('Get solid objects', () => {
    const gameObjectManager = new GameObjectManager()
    const solidObj: GameObjectEntity = { x: 0, y: 0, isSolid: true }
    const nonSolidObj: GameObjectEntity = { x: 0, y: 0, isSolid: false }
    gameObjectManager.addObject(solidObj)
    gameObjectManager.addObject(solidObj)
    gameObjectManager.addObject(nonSolidObj)

    expect(gameObjectManager.getSolids().length).to.be.eq(2)
  })

  it('Get solid objects', () => {
    const gameObjectManager = new GameObjectManager()
    const nonSolidObj: GameObjectEntity = { x: 0, y: 0, isSolid: false }
    gameObjectManager.addSolid(nonSolidObj)

    expect(gameObjectManager.getSolids().length).to.be.eq(1)
  })

  it('Call destroy method on remove object', () => {
    const gameObjectManager = new GameObjectManager()
    let destroyCalled = 0
    const destroyFunc = () => { destroyCalled++ }
    const obj: GameObjectEntity = { x: 0, y: 0, isSolid: true, element: { destroy: destroyFunc } }
    const id = gameObjectManager.addObject(obj)
    gameObjectManager.removeObject(id)

    expect(destroyCalled).to.be.eq(1)
  })

  it('Add object and get id by position', () => {
    const gameObjectManager = new GameObjectManager()

    const validId = gameObjectManager.addObject({ x: 20, y: 22 })
    gameObjectManager.addObject({ x: 20, y: 20 })
    const idToCheck = gameObjectManager.getIDByPosition({x: 20, y: 22})

    expect(idToCheck).contains(validId)
  })
})