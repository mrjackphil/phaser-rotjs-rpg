import { expect } from 'chai'
import 'mocha'
import SolidManager from './solids'

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
    const externalSolidSource = {
        solids: [{x: 1, y: 1 }],
        getSolids: function() { return this.solids }
    }
    const extSolids = externalSolidSource.getSolids.bind(externalSolidSource)

    const solids = new SolidManager([extSolids])
    solids.addSolid({ x: 1, y: 1 })

    expect(solids.getSolids().length).to.be.eq(2)
  })

  it('add two additional solids', () => {
    const externalSolidSource = {
        solids: [{x: 1, y: 1 }],
        getSolids: function() { return this.solids }
    }
    const externalSolidSourc2 = {
        solids: [{x: 2, y: 2 }],
        getSolids: function() { return this.solids }
    }
    const extSolids = externalSolidSource.getSolids.bind(externalSolidSource)
    const extSolid2 = externalSolidSourc2.getSolids.bind(externalSolidSourc2)

    const solids = new SolidManager([extSolids, extSolid2])
    solids.addSolid({ x: 1, y: 1 })

    expect(solids.getSolids().length).to.be.eq(3)
  })

  it('dynamic chenge external solid source', () => {
    const externalSolidSource = {
        solids: [{x: 1, y: 1 }],
        getSolids: function() { return this.solids }
    }
    const extSolids = externalSolidSource.getSolids.bind(externalSolidSource)
    const solids = new SolidManager([extSolids])
    solids.addSolid({ x: 1, y: 1 })

    externalSolidSource.solids = []

    expect(solids.getSolids().length).to.be.eq(1)
  })
})