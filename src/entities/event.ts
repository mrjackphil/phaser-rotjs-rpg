import { Action } from "../models/types"
import EventModel from "../models/EventModel"

export default class EventManager implements EventModel {
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