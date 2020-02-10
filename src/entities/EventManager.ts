import { Action } from "../types/types"
import IEvent from "../types/IEvent"
import {ACTIONS} from "./ActionDistributor"

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
    this.events.forEach( e => e.action(e.params) )
    this.events = []
  }

  public getEvents() {
    return this.events
  }

  public getEventByID(id: number) {
    const emptyAction = { action: () => null, key: ACTIONS.TEST }
    return this.events.filter( event => event.id === id )[0] || emptyAction
  }
}