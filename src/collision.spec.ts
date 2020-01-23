import { expect } from 'chai'
import 'mocha'
import CollisionManager from './collision'
import StateManager from './state'

describe('Test collision manager', () => {
  it('isSolid method returns array', () => {
    const state = new StateManager()
    const collision = new CollisionManager(state)
    const vector = { x: 0, y: 0 }

    const res = collision.isSolid(vector)

    expect(res).to.be.a('boolean')
  })
})