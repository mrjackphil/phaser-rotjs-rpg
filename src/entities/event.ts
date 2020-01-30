import { Action } from "../types/types"
import IEvent from "../types/IEvent"

export default class EventManager implements IEvent {
  private events: Action[] = []
  private lastID: number = 0;

  public add(o: Action) {
    const event = { ...o, id: this.lastID }

    this.events.push(event)
    this.lastID++

    return event.id
  }

  public update() {
    this.events.forEach( e => e.action() )
    this.events = []
  }

  public getEvents() {
    return this.events
  }
}