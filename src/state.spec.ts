import { expect } from 'chai'
import 'mocha'
import SolidManager from './state'

describe('Test StateManager', () => {
  it('state has solids', () => {
    const solids = new SolidManager()
    expect(solids.getSolids()).to.be.an("array")
  })

  it('can add solids', () => {
    const solids = new SolidManager()
    solids.addSolid({ x: 0, y: 0})
    expect(solids.getSolids().length).to.be.eq(1)
  })

  it('add additional solids', () => {
    const solids = new SolidManager([[{x: 0, y: 0}]])
    solids.addSolid({ x: 1, y: 1 })

    expect(solids.getSolids().length).to.be.eq(2)
  })
})