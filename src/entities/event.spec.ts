import { expect } from 'chai'
import 'mocha'
import EventManager from './event'

describe('Event manager', () => {
  it('Add event', () => {
    const ev = new EventManager()
    ev.add({ action: () => "" })

    expect(ev.getEvents().length).to.be.eq(1)
  })

  it('Returns event id on add', () => {
    const ev = new EventManager()
    const id = ev.add({ action: () => "" })

    expect(id).to.be.a('number')
  })

  it('Returns different id for each event', () => {
    const ev = new EventManager()
    const id = ev.add({ action: () => "" })
    const id2 = ev.add({ action: () => "" })

    expect(id !== id2).to.be.eq(true)
  })

  it('Call action', () => {
    const ev = new EventManager()
    let called = 0
    ev.add({ action: () => called++ })
    ev.update()

    expect(called).to.be.eq(1)
  })

  it('On update call remove all actions', () => {
    const ev = new EventManager()
    ev.add({ action: () => "" })
    ev.update()

    expect(ev.getEvents().length).to.be.eq(0)
  })
})