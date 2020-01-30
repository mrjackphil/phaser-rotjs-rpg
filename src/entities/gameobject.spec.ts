import { expect } from 'chai'
import 'mocha'
import GameObjectManager from './gameobject'
import { GameObjectEntity } from '../models/types'

describe('Game object methods', () => {
  it('Add gameobject returns id', () => {
    const gameobject = new GameObjectManager()
    const object: GameObjectEntity = { x: 0, y: 0 }

    const id = gameobject.addObject(object)
    expect(id).to.be.a('number')
  })

  it('Add several object will increase the id number', () => {
    const gameobject = new GameObjectManager()
    const object: GameObjectEntity = { x: 0, y: 0 }

    const id1 = gameobject.addObject(object)
    const id2 = gameobject.addObject(object)
    const id3 = gameobject.addObject(object)

    expect([id1, id2, id3]).to.be.deep.eq([0, 1, 2])
  })

  it('Add game object', () => {
    const gameobject = new GameObjectManager()
    const object: GameObjectEntity = { x: 0, y: 0 }

    gameobject.addObject(object)

    expect(gameobject.getObjects().length).to.be.eq(1)
  })

  it('Remove gameobject', () => {
    const gameobject = new GameObjectManager()
    const object: GameObjectEntity = { x: 0, y: 0 }

    gameobject.addObject(object)
    const willRemove = gameobject.addObject(object)
    gameobject.addObject(object)
    gameobject.removeObject(willRemove)

    expect(gameobject.getObjects().length).to.be.eq(2)
  })

  it('Unique ids for each added gameobject', () => {
    const gameobject = new GameObjectManager()
    const object: GameObjectEntity = { x: 0, y: 0 }

    gameobject.addObject(object)
    gameobject.addObject(object)
    const willRemove = gameobject.addObject(object)

    gameobject.removeObject(willRemove)
    const lastAdded = gameobject.addObject(object)

    expect(lastAdded).to.be.eq(3)
  })

  it('Get solid objects', () => {
    const gameobject = new GameObjectManager()
    const solidObj: GameObjectEntity = { x: 0, y: 0, isSolid: true }
    const nonSolidObj: GameObjectEntity = { x: 0, y: 0, isSolid: false }
    gameobject.addObject(solidObj)
    gameobject.addObject(solidObj)
    gameobject.addObject(nonSolidObj)

    expect(gameobject.getSolids().length).to.be.eq(2)
  })

  it('Get solid objects', () => {
    const gameobject = new GameObjectManager()
    const nonSolidObj: GameObjectEntity = { x: 0, y: 0, isSolid: false }
    gameobject.addSolid(nonSolidObj)

    expect(gameobject.getSolids().length).to.be.eq(1)
  })

  it('Call destroy method on remove object', () => {
    const gameobject = new GameObjectManager()
    let destroyCalled = 0
    const destroyFunc = () => { destroyCalled++ }
    const obj: GameObjectEntity = { x: 0, y: 0, isSolid: true, element: { destroy: destroyFunc } }
    const id = gameobject.addObject(obj)
    gameobject.removeObject(id)

    expect(destroyCalled).to.be.eq(1)
  })

  it('Add object and get id by position', () => {
    const gameobject = new GameObjectManager()

    const validId = gameobject.addObject({ x: 20, y: 22 })
    gameobject.addObject({ x: 20, y: 20 })
    const idToCheck = gameobject.getIDByPosition({x: 20, y: 22})

    expect(idToCheck).contains(validId)
  })
})