import { expect } from 'chai'
import 'mocha'
import CollisionManager from './collision'
import StateManager from './state'
import { GridVector } from './types'

describe('Test collision manager', () => {
  it('isSolid method returns array', () => {
    const state = new StateManager()
    const collision = new CollisionManager(state)
    const vector = { kind: 'grid', value: { x: 0, y: 0 } } as GridVector

    const res = collision.isSolid(vector)

    expect(res).to.be.a('boolean')
  })
})