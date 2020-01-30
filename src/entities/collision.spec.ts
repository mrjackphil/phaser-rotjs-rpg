import { expect } from 'chai'
import 'mocha'
import CollisionManager from './collision'
import { GridVector } from '../types/types'

function StateManager() {}
StateManager.prototype.getSolids = () => []
StateManager.prototype.isSolid = () => true

describe('Test collision manager', () => {
  it('isSolid method returns boolean', () => {
    const state = new StateManager()
    const collision = new CollisionManager(state)
    const vector = { kind: 'grid', value: { x: 0, y: 0 } } as GridVector

    const res = collision.isSolid(vector)

    expect(res).to.be.a('boolean')
  })

  it('isEmpty method returns boolean', () => {
    const state = new StateManager()
    const collision = new CollisionManager(state)
    const vector = { kind: 'grid', value: { x: 0, y: 0 } } as GridVector

    const res = collision.isEmpty(vector)

    expect(res).to.be.a('boolean')
  })

  it('isEmpty should return true', () => {
    const state = new StateManager()
    const collision = new CollisionManager(state)
    const vector = { kind: 'grid', value: { x: 0, y: 0 } } as GridVector

    const res = collision.isEmpty(vector)

    expect(res).to.be.equal(true)
  })
})