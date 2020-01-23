import { expect } from 'chai'
import 'mocha'
import StateManager from './state'

describe('Test StateManager', () => {
  it('state has solids', () => {
    const state = new StateManager()
    expect(state.getSolids()).to.be.an("array")
  })

  it('can add solids', () => {
    const state = new StateManager()
    state.addSolid({ x: 0, y: 0})
    expect(state.getSolids().length).to.be.eq(1)
  })
})