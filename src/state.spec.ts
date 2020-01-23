import { expect } from 'chai'
import 'mocha'
import StateManager from './state'

describe('Test StateManager', () => {
  it('State has solids', () => {
    const state = new StateManager()
    expect(state.solids).to.be.an("array")
  })
})